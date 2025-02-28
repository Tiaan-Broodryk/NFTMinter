DEFINE TABLE vehicle SCHEMALESS
	PERMISSIONS
		FOR select 
            WHERE team in (select value team from teammember where user = $auth and pending == false)
		FOR create, update
			WHERE team in (select value team from teammember where user = $auth and pending == false)
		FOR delete			
			WHERE team in (select value team from teammember where user = $auth and pending == false)
;

DEFINE TABLE teammember SCHEMALESS
	PERMISSIONS
		FOR select 
            WHERE user = $auth and pending == false
		FOR create, update
			WHERE team in (select value team from teammember)
		FOR delete			
			WHERE user = $auth
;