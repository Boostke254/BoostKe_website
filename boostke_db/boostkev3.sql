--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-28 12:58:25

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
-- TOC entry 217 (class 1259 OID 16388)
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
    reset_code character varying(50),
    access character varying(255) DEFAULT 'normal'::character varying
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16397)
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
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;


--
-- TOC entry 236 (class 1259 OID 16536)
-- Name: faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question text NOT NULL,
    answer text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.faqs OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16535)
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO postgres;

--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 235
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- TOC entry 219 (class 1259 OID 16398)
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
-- TOC entry 220 (class 1259 OID 16405)
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
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 220
-- Name: landlords_landlord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.landlords_landlord_id_seq OWNED BY public.landlords.landlord_id;


--
-- TOC entry 221 (class 1259 OID 16406)
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
-- TOC entry 222 (class 1259 OID 16414)
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
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 222
-- Name: listings_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listings_listing_id_seq OWNED BY public.listings.listing_id;


--
-- TOC entry 223 (class 1259 OID 16415)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    from_user integer NOT NULL,
    to_user integer NOT NULL,
    text text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    from_user_type character varying(20) DEFAULT 'user'::character varying NOT NULL,
    to_user_type character varying(20) DEFAULT 'user'::character varying NOT NULL,
    listing_id integer,
    status character varying(10) DEFAULT 'unread'::character varying,
    message_type character varying(20) DEFAULT 'text'::character varying,
    listing_image_url text,
    listing_title text
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16421)
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
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 224
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- TOC entry 225 (class 1259 OID 16422)
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
-- TOC entry 226 (class 1259 OID 16426)
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
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_views_view_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_views_view_id_seq OWNED BY public.product_views.view_id;


--
-- TOC entry 227 (class 1259 OID 16427)
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
    CONSTRAINT properties_price_basis_check CHECK (((price_basis)::text = ANY (ARRAY[('monthly'::character varying)::text, ('semester'::character varying)::text, ('full'::character varying)::text])))
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16436)
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
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 228
-- Name: properties_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.properties_property_id_seq OWNED BY public.properties.property_id;


--
-- TOC entry 229 (class 1259 OID 16437)
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
-- TOC entry 230 (class 1259 OID 16444)
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
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 230
-- Name: retailers_retailer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retailers_retailer_id_seq OWNED BY public.retailers.retailer_id;


--
-- TOC entry 231 (class 1259 OID 16445)
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
-- TOC entry 232 (class 1259 OID 16452)
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
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 232
-- Name: shops_shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shops_shop_id_seq OWNED BY public.shops.shop_id;


--
-- TOC entry 233 (class 1259 OID 16453)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    mobile character varying(15),
    password text NOT NULL,
    photo_url text,
    balance numeric(10,2) DEFAULT 0.00,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    verification_code integer,
    is_verified boolean DEFAULT false,
    reset_code character varying(6),
    reset_code_expiry timestamp without time zone,
    account_deactivate boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16461)
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
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 234
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4686 (class 2604 OID 16462)
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 16539)
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- TOC entry 4692 (class 2604 OID 16463)
-- Name: landlords landlord_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords ALTER COLUMN landlord_id SET DEFAULT nextval('public.landlords_landlord_id_seq'::regclass);


--
-- TOC entry 4695 (class 2604 OID 16464)
-- Name: listings listing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings ALTER COLUMN listing_id SET DEFAULT nextval('public.listings_listing_id_seq'::regclass);


--
-- TOC entry 4699 (class 2604 OID 16465)
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- TOC entry 4705 (class 2604 OID 16466)
-- Name: product_views view_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views ALTER COLUMN view_id SET DEFAULT nextval('public.product_views_view_id_seq'::regclass);


--
-- TOC entry 4707 (class 2604 OID 16467)
-- Name: properties property_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties ALTER COLUMN property_id SET DEFAULT nextval('public.properties_property_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 16468)
-- Name: retailers retailer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers ALTER COLUMN retailer_id SET DEFAULT nextval('public.retailers_retailer_id_seq'::regclass);


--
-- TOC entry 4714 (class 2604 OID 16469)
-- Name: shops shop_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops ALTER COLUMN shop_id SET DEFAULT nextval('public.shops_shop_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 16470)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4726 (class 2606 OID 16472)
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- TOC entry 4728 (class 2606 OID 16474)
-- Name: admin admin_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_mobile_key UNIQUE (mobile);


--
-- TOC entry 4730 (class 2606 OID 16476)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 4760 (class 2606 OID 16544)
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 2606 OID 16478)
-- Name: landlords landlords_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_email_key UNIQUE (email);


--
-- TOC entry 4734 (class 2606 OID 16480)
-- Name: landlords landlords_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_mobile_key UNIQUE (mobile);


--
-- TOC entry 4736 (class 2606 OID 16482)
-- Name: landlords landlords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landlords
    ADD CONSTRAINT landlords_pkey PRIMARY KEY (landlord_id);


--
-- TOC entry 4738 (class 2606 OID 16484)
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (listing_id);


--
-- TOC entry 4740 (class 2606 OID 16486)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- TOC entry 4742 (class 2606 OID 16488)
-- Name: product_views product_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_pkey PRIMARY KEY (view_id);


--
-- TOC entry 4744 (class 2606 OID 16490)
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (property_id);


--
-- TOC entry 4746 (class 2606 OID 16492)
-- Name: retailers retailers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_email_key UNIQUE (email);


--
-- TOC entry 4748 (class 2606 OID 16494)
-- Name: retailers retailers_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_mobile_key UNIQUE (mobile);


--
-- TOC entry 4750 (class 2606 OID 16496)
-- Name: retailers retailers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_pkey PRIMARY KEY (retailer_id);


--
-- TOC entry 4752 (class 2606 OID 16498)
-- Name: shops shops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT shops_pkey PRIMARY KEY (shop_id);


--
-- TOC entry 4754 (class 2606 OID 16500)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4756 (class 2606 OID 16502)
-- Name: users users_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_key UNIQUE (mobile);


--
-- TOC entry 4758 (class 2606 OID 16504)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4761 (class 2606 OID 16505)
-- Name: listings listings_retailer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES public.retailers(retailer_id) ON DELETE SET NULL;


--
-- TOC entry 4762 (class 2606 OID 16510)
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- TOC entry 4763 (class 2606 OID 16515)
-- Name: product_views product_views_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(listing_id) ON DELETE CASCADE;


--
-- TOC entry 4764 (class 2606 OID 16520)
-- Name: product_views product_views_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_views
    ADD CONSTRAINT product_views_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- TOC entry 4765 (class 2606 OID 16525)
-- Name: properties properties_landlord_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_landlord_id_fkey FOREIGN KEY (landlord_id) REFERENCES public.landlords(landlord_id) ON DELETE CASCADE;


--
-- TOC entry 4766 (class 2606 OID 16530)
-- Name: shops shops_retailer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT shops_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES public.retailers(retailer_id) ON DELETE CASCADE;


-- Completed on 2025-04-28 12:58:31

--
-- PostgreSQL database dump complete
--

