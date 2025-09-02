
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT, -- Optional, if admins will provide answers later
    created_at TIMESTAMP DEFAULT NOW()
);


--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    user_id integer DEFAULT 1 NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    mobile character varying(15) NOT NULL,
    password text DEFAULT '12345678'::text NOT NULL,
    role character varying(50) NOT NULL,
    photo_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reset_code character varying(50)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_admin_id_seq OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;


--
-- Name: landlords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.landlords (
    landlord_id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    mobile character varying(15) NOT NULL,
    password text NOT NULL,
    photo_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    verification_code integer,
    is_verified boolean DEFAULT false,
    reset_code character varying(6),
    reset_code_expiry timestamp without time zone,
    verification_code_expires_at timestamp without time zone
);


ALTER TABLE public.landlords OWNER TO postgres;

--
-- Name: landlords_landlord_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.landlords_landlord_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.landlords_landlord_id_seq OWNER TO postgres;

--
-- Name: landlords_landlord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.landlords_landlord_id_seq OWNED BY public.landlords.landlord_id;


--
-- Name: listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listings (
    listing_id integer NOT NULL,
    user_id integer,
    retailer_id integer,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category character varying(100),
    photos text[],
    location character varying(255),
    is_available boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    view_count integer DEFAULT 0
);


ALTER TABLE public.listings OWNER TO postgres;

--
-- Name: listings_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listings_listing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listings_listing_id_seq OWNER TO postgres;

--
-- Name: listings_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listings_listing_id_seq OWNED BY public.listings.listing_id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    from_user integer NOT NULL,
    to_user integer NOT NULL,
    text text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_message_id_seq OWNER TO postgres;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: product_views; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_views (
    view_id integer NOT NULL,
    listing_id integer,
    user_id integer,
    session_id character varying(255),
    viewed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_views OWNER TO postgres;

--
-- Name: product_views_view_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_views_view_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_views_view_id_seq OWNER TO postgres;

--
-- Name: product_views_view_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_views_view_id_seq OWNED BY public.product_views.view_id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    property_id integer NOT NULL,
    landlord_id integer,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    property_type character varying(35) NOT NULL,
    address character varying(255),
    rooms integer,
    bathrooms integer,
    amenities text[],
    photos text[],
    is_available boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    latitude numeric(10,8),
    longitude numeric(11,8),
    county character varying(100),
    price_basis character varying(20) DEFAULT 'full'::character varying,
    CONSTRAINT properties_price_basis_check CHECK (((price_basis)::text = ANY ((ARRAY['monthly'::character varying, 'semester'::character varying, 'full'::character varying])::text[])))
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- Name: properties_property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.properties_property_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.properties_property_id_seq OWNER TO postgres;

--
-- Name: properties_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.properties_property_id_seq OWNED BY public.properties.property_id;


--
-- Name: retailers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.retailers (
    retailer_id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    mobile character varying(15) NOT NULL,
    password text NOT NULL,
    photo_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    verification_code character varying(6),
    is_verified boolean DEFAULT false,
    reset_code character varying(6),
    reset_code_expiry timestamp without time zone
);


ALTER TABLE public.retailers OWNER TO postgres;

--
-- Name: retailers_retailer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.retailers_retailer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.retailers_retailer_id_seq OWNER TO postgres;

--
-- Name: retailers_retailer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retailers_retailer_id_seq OWNED BY public.retailers.retailer_id;


--
-- Name: shops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shops (
    shop_id integer NOT NULL,
    retailer_id integer,
    shop_name character varying(150) NOT NULL,
    shop_description text,
    shop_logo text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    views_count integer DEFAULT 0
);


ALTER TABLE public.shops OWNER TO postgres;

--
-- Name: shops_shop_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shops_shop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shops_shop_id_seq OWNER TO postgres;

--
-- Name: shops_shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shops_shop_id_seq OWNED BY public.shops.shop_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    mobile character varying(15) NOT NULL,
    password text NOT NULL,
    photo_url text,
    balance numeric(10,2) DEFAULT 0.00,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    verification_code integer,
    is_verified boolean DEFAULT false,
    reset_code character varying(6),
    reset_code_expiry timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);


--
-- Name: landlords landlord_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords ALTER COLUMN landlord_id SET DEFAULT nextval('public.landlords_landlord_id_seq'::regclass);


--
-- Name: listings listing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings ALTER COLUMN listing_id SET DEFAULT nextval('public.listings_listing_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Name: product_views view_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views ALTER COLUMN view_id SET DEFAULT nextval('public.product_views_view_id_seq'::regclass);


--
-- Name: properties property_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties ALTER COLUMN property_id SET DEFAULT nextval('public.properties_property_id_seq'::regclass);


--
-- Name: retailers retailer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers ALTER COLUMN retailer_id SET DEFAULT nextval('public.retailers_retailer_id_seq'::regclass);


--
-- Name: shops shop_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops ALTER COLUMN shop_id SET DEFAULT nextval('public.shops_shop_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, user_id, full_name, email, mobile, password, role, photo_url, created_at, updated_at, reset_code) FROM stdin;
2	1	Meshack Ayaga	meshack.ayaga@boostke.co.ke	0798917486	$2b$10$bKjSGmNuk418ptYgGUanKeCQvF52bDpw4KPBirPsFStqTtkh6BfoS	CEO	\N	2025-01-08 15:46:39.184969	2025-01-08 15:46:39.184969	\N
3	1	Anne	anne@gmail.com	0739556451	$2b$10$jDiNS/y5gExHS2Ad3zVuh.bafuj1NBLZ/3jL/Qif1NKQopfOvckzi	Marketing Manager	\N	2025-01-08 15:46:39.184969	2025-01-08 15:46:39.184969	\N
4	1	Kevin	kevin@gmail.com	0717972648	$2b$10$FRb2VvjZ3BAP8TNsn5LgH.8yuC2Gn/heeNZ0dBHqvHtx4hOaxs0yi	CFO	\N	2025-01-08 15:46:39.184969	2025-01-08 15:46:39.184969	\N
5	1	Victor Mulunda	victormulunda@gmail.com	0110569933	$2b$10$BCtZIzF2rk6RxxpwaQ1PEuJiiBaceJGkJhox0a7oss8DTRk4vUH8q	COO	\N	2025-01-08 15:46:39.184969	2025-01-08 15:46:39.184969	\N
1	1	Paul Ndalila	paulndalila001@gmail.com	0769257996	$2b$10$5TSGOo1uSy0lbFaXlSX8SOKsur87T7w3qbnbcJj7fTIIzQJRPVYh6	Developer/CTO	http://example.com/photo.jpg	2025-01-08 15:46:39.184969	2025-01-08 16:37:18.469117	\N
\.


--
-- Data for Name: landlords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.landlords (landlord_id, full_name, email, mobile, password, photo_url, created_at, verification_code, is_verified, reset_code, reset_code_expiry, verification_code_expires_at) FROM stdin;
1	John Doe	john.doe@example.com	0712345678	$2b$10$i68Tbf8RBCz9Vp2NuNX0duJoE/wTedJGYvhh6/pHYNNv9v4WZehDe	\N	2025-01-03 00:23:30.137683	\N	f	\N	\N	\N
2	John Doe	paulndalila001@gmail.com	0769257996	$2b$10$lS/3kLl9iz8wjGFh5HbsQOmQlI.LUDfQx7.F1CDwVn6i68DrdRGdy	\N	2025-01-03 14:08:56.97664	\N	t	\N	\N	\N
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listings (listing_id, user_id, retailer_id, title, description, price, category, photos, location, is_available, created_at, view_count) FROM stdin;
25	6	\N	laptop	4gb 500gb	15000.00	electronic	{uploads/1736317397063-disease.jpg}	nairobi	t	2025-01-08 09:23:17.253881	0
26	6	\N	laptop	4gb 500gb	15000.00	electronic	{uploads/1736318207141-paul.jpg}	nairobi	t	2025-01-08 09:36:48.114697	0
27	6	\N	laptop	4gb 500gb	15000.00	electronic	{uploads/1736318264409-paul.jpg,uploads/1736318264409-disease.jpg}	nairobi	t	2025-01-08 09:37:44.548901	0
24	6	\N	laptop	4gb 500gb	15000.00	electronic	{"uploads\\\\1736316953998-paul.jpg"}	nairobi	t	2025-01-08 09:15:55.506022	2
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, from_user, to_user, text, "timestamp") FROM stdin;
\.


--
-- Data for Name: product_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_views (view_id, listing_id, user_id, session_id, viewed_at) FROM stdin;
18	24	6	24f5954691c06da7ee3ebebdebb785e7	2025-01-08 09:36:17.54101
19	24	\N	3f5fb7843a24e677ab3ab5b6fa463e07	2025-01-08 09:39:17.028133
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (property_id, landlord_id, title, description, price, property_type, address, rooms, bathrooms, amenities, photos, is_available, created_at, latitude, longitude, county, price_basis) FROM stdin;
1	2	3 Bedroom Apartment	Spacious apartment with modern amenities.	500.00	apartment	123 Main Street	3	2	{Parking,Wi-Fi}	{photo1.jpg,photo2.jpg}	t	2025-01-03 14:12:21.137737	-1.28638900	36.81722300	Nairobi	monthly
2	2	Green valley	Nicely designed with modern amenities.	35000.00	hostel	Maseno university main campus	1	1	{"Swimming pool",Wi-Fi}	{photo1.jpg,photo2.jpg}	t	2025-01-03 14:14:52.780942	-1.28638900	36.81722300	Kisumu	semester
\.


--
-- Data for Name: retailers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.retailers (retailer_id, full_name, email, mobile, password, photo_url, created_at, verification_code, is_verified, reset_code, reset_code_expiry) FROM stdin;
1	Aggrey Simiyu	simiyuaggrey@gmail.com	0712345678	$2b$10$Z/uuji9S.tMrL8ZXfU98XeBFp1Q1v/XyFo38Avfp5VsMs.zGu/lNO	\N	2025-01-03 00:26:57.317031	\N	f	\N	\N
3	Aggrey Simiyu	simiyuaggreyy@gmail.com	0712355678	$2b$10$haXRLRDvZjnXfEFLAgVl7eihTflClK1eKmCuSLRHcWd.f2HpCOika	\N	2025-01-03 00:39:04.853445	621052	f	\N	\N
4	Paul Ndalila	paulndalila001@gmail.com	0769257996	$2b$10$4xAK8QgXTtbYUKkTPTghcuoRV03nBSVnZ0hOvGbND/eXkOa8.3BTy	\N	2025-01-03 00:42:28.866105	\N	t	\N	\N
\.


--
-- Data for Name: shops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shops (shop_id, retailer_id, shop_name, shop_description, shop_logo, created_at, views_count) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, mobile, password, photo_url, balance, created_at, verification_code, is_verified, reset_code, reset_code_expiry) FROM stdin;
1	Paul Ndalila	pa@gmail.com	0769257996	$2b$10$YFxEI8sc43lt.5aNhiQs0e81PAIYoRCqYnHdcbHDw..WLCj7tpv0O	\N	0.00	2025-01-02 23:51:31.944386	\N	f	\N	\N
4	paul ndalila	paulndalila007@gmail.com	0765432176	$2b$10$eVNjIl2bK2NWXJOH4OMuOecpT23L/Nl6un5mSoDmLI.zbsnD1pG7u	\N	0.00	2025-01-05 17:37:06.211533	585904	f	\N	\N
6	Paul Ndalila	paulndalila001@gmail.com	0729000000	$2b$10$YfKBb4u5VODCCYYwrzLxPucN3jDc.ofNOgQgjyFjhspID0/V3VrbO	\N	0.00	2025-01-07 10:30:19.18013	\N	t	\N	\N
\.


--
-- Name: admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_admin_id_seq', 5, true);


--
-- Name: landlords_landlord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.landlords_landlord_id_seq', 2, true);


--
-- Name: listings_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listings_listing_id_seq', 27, true);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- Name: product_views_view_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_views_view_id_seq', 19, true);


--
-- Name: properties_property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.properties_property_id_seq', 2, true);


--
-- Name: retailers_retailer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.retailers_retailer_id_seq', 4, true);


--
-- Name: shops_shop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shops_shop_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- Name: admin admin_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_mobile_key UNIQUE (mobile);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: landlords landlords_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_email_key UNIQUE (email);


--
-- Name: landlords landlords_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_mobile_key UNIQUE (mobile);


--
-- Name: landlords landlords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_pkey PRIMARY KEY (landlord_id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (listing_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: product_views product_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_pkey PRIMARY KEY (view_id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (property_id);


--
-- Name: retailers retailers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_email_key UNIQUE (email);


--
-- Name: retailers retailers_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_mobile_key UNIQUE (mobile);


--
-- Name: retailers retailers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_pkey PRIMARY KEY (retailer_id);


--
-- Name: shops shops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT shops_pkey PRIMARY KEY (shop_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_key UNIQUE (mobile);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: listings listings_retailer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES public.retailers(retailer_id) ON DELETE SET NULL;


--
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: product_views product_views_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(listing_id) ON DELETE CASCADE;


--
-- Name: product_views product_views_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: properties properties_landlord_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_landlord_id_fkey FOREIGN KEY (landlord_id) REFERENCES public.landlords(landlord_id) ON DELETE CASCADE;


--
-- Name: shops shops_retailer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT shops_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES public.retailers(retailer_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

