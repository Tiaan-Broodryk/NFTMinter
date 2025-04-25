// import type { CommonProviderOptions } from "./index.js";
// import type { Awaitable, Theme } from "../types.js";

import { type Awaitable } from "next-auth";
import {
  type CommonProviderOptions,
  type EmailUserConfig,
  type SendVerificationRequestParams,
} from "next-auth/providers/index";
import { Resend } from "resend";
import { EmailSignin } from "~/emails/EmailSignin";
import { render } from "~/lib/reactmail/render";

export interface EmailUserConfigCustom extends Record<string, unknown> {
  type?: "email";
  /** @default `"Auth.js <no-reply@authjs.dev>"` */
  from?: string;
  /**
   * How long until the e-mail can be used to log the user in,
   * in seconds. Defaults to 1 day
   *
   * @default 86400
   */
  maxAge?: number;
  /** [Documentation](https://authjs.dev/guides/providers/email#customizing-emails) */
  sendVerificationRequest?: (
    params: SendVerificationRequestParams,
  ) => Awaitable<void>;

  generateVerificationToken?: () => Awaitable<string>;
  /** If defined, it is used to hash the verification token when saving to the database . */
  secret?: string;

  normalizeIdentifier?: (identifier: string) => string;
}

export interface EmailConfig extends CommonProviderOptions {
  // defaults
  id: "email";
  type: "email";

  name: "Email";
  server: NonNullable<EmailUserConfig["server"]>;
  from: string;
  maxAge: number;
  sendVerificationRequest: (
    params: SendVerificationRequestParams,
  ) => Awaitable<void>;

  /**
   * This is copied into EmailConfig in parseProviders() don't use elsewhere
   */
  options: EmailUserConfigCustom;

  secret?: string;
  generateVerificationToken?: () => Awaitable<string>;
  normalizeIdentifier?: (identifier: string) => string;
}

export type EmailProviderType = "email";

export function EmailProviderCustom(
  config: EmailUserConfigCustom,
): EmailConfig {
  return {
    id: "email",
    type: "email",
    name: "Email",
    server: { host: "localhost", port: 25, auth: { user: "", pass: "" } },
    from: "Auth.js <no-reply@authjs.dev>",
    maxAge: 24 * 60 * 60,
    sendVerificationRequest: async (params) => {
      const { identifier, url, provider } = params;
      const { host } = new URL(url);

      const provider_data_passthrough = params.provider as unknown as {
        apikey: string;
      };

      const resend = new Resend(provider_data_passthrough.apikey);

      try {
        await resend.emails.send({
          from: provider.from,
          to: identifier,
          subject: "Sign in",
          text: render(EmailSignin({ url, host }), {
            plainText: true,
          }),
          html: render(EmailSignin({ url, host }), {}),
        });
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(`Email (${err.message}) could not be sent`);
        }
      }
    },
    options: config,
  };
}
