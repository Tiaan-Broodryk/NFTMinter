export const initdb = /* surrealql */ `
-- START ----------------------------------------------------
DEFINE SCOPE apikey SESSION 24h
    SIGNUP ( NULL )
    SIGNIN (
        SELECT VALUE user.* FROM apikey WHERE apikey is $apikey
    );
-------------------------------------------------------------
DEFINE TABLE chat SCHEMALESS
	PERMISSIONS
		FOR select 
            WHERE true
		FOR create, update
			WHERE true
		FOR delete			
			WHERE true
;
-------------------------------------------------------------
INFO FOR DB;
-- END ------------------------------------------------------
`;
