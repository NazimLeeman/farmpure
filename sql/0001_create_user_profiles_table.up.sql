CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    name TEXT,
    title VARCHAR(255),
    about TEXT,
    emails email[] CHECK (email_primary = ANY(emails)),
    email_primary email,
    photo UUID,
    banner UUID,
    website VARCHAR(255),
    phone VARCHAR(20),
    country VARCHAR(2) DEFAULT 'BD',
    city VARCHAR(100),
    location JSONB, -- geojson
    timezone VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    urls JSONB, -- [{name:url}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    instance_id TEXT, -- zitadel instance_id
    FOREIGN KEY (instance_id, id) REFERENCES auth.users2(instance_id, id)
);

CREATE OR REPLACE FUNCTION auth.create_user_on_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users(id, first_name, last_name, emails, email_primary, instance_id)
    VALUES (NEW.id, NEW.first_name, NEW.last_name, ARRAY[NEW.email], NEW.email, NEW.instance_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_create_user_on_signup
AFTER INSERT ON auth.users2
FOR EACH ROW
EXECUTE FUNCTION auth.create_user_on_signup();

GRANT SELECT ON public.users TO anon;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.users TO authn;
--
