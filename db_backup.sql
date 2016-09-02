
CREATE TABLE category (
    id serial primary key NOT NULL,
    name text NOT NULL
);

CREATE TABLE recipe (
    id serial primary key NOT NULL,
    category integer references category NOT NULL,
    name text NOT NULL,
    chef text NOT NULL,
    preparation text NOT NULL
);

CREATE TABLE ingredient (
    id serial primary key NOT NULL,
    recipeId integer references recipe NOT NULL,
    name text NOT NULL,
    amount text NOT NULL
);

CREATE TABLE ranking (
    id serial primary key NOT NULL,
    recipeId integer references recipe NOT NULL,
    stars integer NOT NULL,
    comment text NOT NULL
);


ALTER TABLE ranking OWNER TO postgres;

--
-- Name: ranking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ranking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ranking_id_seq OWNER TO postgres;

--
-- Name: ranking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ranking_id_seq OWNED BY ranking.id;


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--




ALTER TABLE recipe OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE recipe_id_seq OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE recipe_id_seq OWNED BY recipe.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('category_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ingredient ALTER COLUMN id SET DEFAULT nextval('ingredient_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ranking ALTER COLUMN id SET DEFAULT nextval('ranking_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recipe ALTER COLUMN id SET DEFAULT nextval('recipe_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (id, name) FROM stdin;
1	PASTAS
2	SALADS
3	MEAT
4	DESSERTS
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_id_seq', 4, true);


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ingredient (id, recipe, name, amount) FROM stdin;
\.


--
-- Name: ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ingredient_id_seq', 1, false);


--
-- Data for Name: ranking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ranking (id, recipe, comment) FROM stdin;
\.


--
-- Name: ranking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ranking_id_seq', 1, false);


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY recipe (id, category, name, chef, preparation) FROM stdin;
\.


--
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('recipe_id_seq', 1, false);


--
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (id);


--
-- Name: ranking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT ranking_pkey PRIMARY KEY (id);


--
-- Name: recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);


--
-- Name: ingredient_recipe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ingredient
    ADD CONSTRAINT ingredient_recipe_fkey FOREIGN KEY (recipe) REFERENCES recipe(id);


--
-- Name: ranking_recipe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT ranking_recipe_fkey FOREIGN KEY (recipe) REFERENCES recipe(id);


--
-- Name: recipe_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recipe
    ADD CONSTRAINT recipe_category_fkey FOREIGN KEY (category) REFERENCES category(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

