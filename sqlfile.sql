--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    account_id bigint NOT NULL,
    username character varying(30),
    password character varying(30) NOT NULL,
    role character varying(30) NOT NULL,
    status character varying(30) NOT NULL,
    created_date date NOT NULL,
    emp_id bigint
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_account_id_seq OWNER TO postgres;

--
-- Name: accounts_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_account_id_seq OWNED BY public.accounts.account_id;


--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id bigint NOT NULL,
    account_id bigint NOT NULL,
    emp_id bigint NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_account_id_seq OWNER TO postgres;

--
-- Name: admin_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_account_id_seq OWNED BY public.admin.account_id;


--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_admin_id_seq OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;


--
-- Name: admin_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_emp_id_seq OWNER TO postgres;

--
-- Name: admin_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_emp_id_seq OWNED BY public.admin.emp_id;


--
-- Name: cashier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cashier (
    cashier_id bigint NOT NULL,
    account_id bigint NOT NULL,
    emp_id bigint NOT NULL
);


ALTER TABLE public.cashier OWNER TO postgres;

--
-- Name: cashier_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cashier_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cashier_account_id_seq OWNER TO postgres;

--
-- Name: cashier_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cashier_account_id_seq OWNED BY public.cashier.account_id;


--
-- Name: cashier_cashier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cashier_cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cashier_cashier_id_seq OWNER TO postgres;

--
-- Name: cashier_cashier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cashier_cashier_id_seq OWNED BY public.cashier.cashier_id;


--
-- Name: cashier_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cashier_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cashier_emp_id_seq OWNER TO postgres;

--
-- Name: cashier_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cashier_emp_id_seq OWNED BY public.cashier.emp_id;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    emp_id bigint NOT NULL,
    fullname character varying(30) NOT NULL,
    contact_number character varying(15) NOT NULL,
    "position" character varying(30) NOT NULL,
    start_date date NOT NULL,
    sallery numeric NOT NULL,
    created_by bigint NOT NULL,
    status character varying(30) NOT NULL,
    gender character varying(30)
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_created_by_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_created_by_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_created_by_seq OWNER TO postgres;

--
-- Name: employee_created_by_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_created_by_seq OWNED BY public.employee.created_by;


--
-- Name: employee_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_emp_id_seq OWNER TO postgres;

--
-- Name: employee_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_emp_id_seq OWNED BY public.employee.emp_id;


--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    expense_id bigint NOT NULL,
    amount numeric NOT NULL,
    reason character varying(150) NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: expense_expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expense_expense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expense_expense_id_seq OWNER TO postgres;

--
-- Name: expense_expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expense_expense_id_seq OWNED BY public.expense.expense_id;


--
-- Name: member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member (
    member_id bigint NOT NULL,
    fullname character varying(30) NOT NULL,
    age integer,
    gender character varying(15) NOT NULL,
    contact_number character varying(15) NOT NULL,
    weight double precision
);


ALTER TABLE public.member OWNER TO postgres;

--
-- Name: member_member_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_member_id_seq OWNER TO postgres;

--
-- Name: member_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_member_id_seq OWNED BY public.member.member_id;


--
-- Name: membership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership (
    membership_id bigint NOT NULL,
    memebership_type character varying(30) NOT NULL,
    member_id bigint NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    status character varying(20) NOT NULL,
    registration_date date NOT NULL,
    account_id bigint NOT NULL
);


ALTER TABLE public.membership OWNER TO postgres;

--
-- Name: membership_cashier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membership_cashier_id_seq OWNER TO postgres;

--
-- Name: membership_cashier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_cashier_id_seq OWNED BY public.membership.account_id;


--
-- Name: membership_member_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membership_member_id_seq OWNER TO postgres;

--
-- Name: membership_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_member_id_seq OWNED BY public.membership.member_id;


--
-- Name: membership_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_membership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membership_membership_id_seq OWNER TO postgres;

--
-- Name: membership_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_membership_id_seq OWNED BY public.membership.membership_id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    payment_id bigint NOT NULL,
    membership_id bigint NOT NULL,
    account_id bigint NOT NULL,
    amount numeric NOT NULL,
    payment_date date NOT NULL,
    payment_type character varying(30)
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: payment_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_account_id_seq OWNER TO postgres;

--
-- Name: payment_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_account_id_seq OWNED BY public.payment.account_id;


--
-- Name: payment_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_membership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_membership_id_seq OWNER TO postgres;

--
-- Name: payment_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_membership_id_seq OWNED BY public.payment.membership_id;


--
-- Name: payment_paymnet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_paymnet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_paymnet_id_seq OWNER TO postgres;

--
-- Name: payment_paymnet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_paymnet_id_seq OWNED BY public.payment.payment_id;


--
-- Name: accounts account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN account_id SET DEFAULT nextval('public.accounts_account_id_seq'::regclass);


--
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);


--
-- Name: admin account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN account_id SET DEFAULT nextval('public.admin_account_id_seq'::regclass);


--
-- Name: admin emp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN emp_id SET DEFAULT nextval('public.admin_emp_id_seq'::regclass);


--
-- Name: cashier cashier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier ALTER COLUMN cashier_id SET DEFAULT nextval('public.cashier_cashier_id_seq'::regclass);


--
-- Name: cashier account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier ALTER COLUMN account_id SET DEFAULT nextval('public.cashier_account_id_seq'::regclass);


--
-- Name: cashier emp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier ALTER COLUMN emp_id SET DEFAULT nextval('public.cashier_emp_id_seq'::regclass);


--
-- Name: employee emp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN emp_id SET DEFAULT nextval('public.employee_emp_id_seq'::regclass);


--
-- Name: employee created_by; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN created_by SET DEFAULT nextval('public.employee_created_by_seq'::regclass);


--
-- Name: expense expense_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense ALTER COLUMN expense_id SET DEFAULT nextval('public.expense_expense_id_seq'::regclass);


--
-- Name: member member_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member ALTER COLUMN member_id SET DEFAULT nextval('public.member_member_id_seq'::regclass);


--
-- Name: membership membership_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership ALTER COLUMN membership_id SET DEFAULT nextval('public.membership_membership_id_seq'::regclass);


--
-- Name: membership member_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership ALTER COLUMN member_id SET DEFAULT nextval('public.membership_member_id_seq'::regclass);


--
-- Name: membership account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership ALTER COLUMN account_id SET DEFAULT nextval('public.membership_cashier_id_seq'::regclass);


--
-- Name: payment payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_paymnet_id_seq'::regclass);


--
-- Name: payment membership_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN membership_id SET DEFAULT nextval('public.payment_membership_id_seq'::regclass);


--
-- Name: payment account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN account_id SET DEFAULT nextval('public.payment_account_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (account_id, username, password, role, status, created_date, emp_id) FROM stdin;
1	root	123456aaAA$	Admin	Active	2024-11-02	\N
35	natik1123	123456aaAA$	Admin	Active	2024-03-13	31
5	ruth	123456aaAA$	Cashier	Active	2024-03-12	1
32	natik112	123456aaAA$	Cashier	Active	2024-03-13	28
\.


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, account_id, emp_id) FROM stdin;
\.


--
-- Data for Name: cashier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cashier (cashier_id, account_id, emp_id) FROM stdin;
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (emp_id, fullname, contact_number, "position", start_date, sallery, created_by, status, gender) FROM stdin;
2	ruth tadese	910789943	Cashier	2024-03-12	6000	1	Active	Female\n
31	natnael kebede	910789943	Admin	2024-03-13	6000	1	Active	Male
1	ruth tadese	910789943	Cashier	2024-03-12	7500	1	Active	Female
28	natnael kebede	910789943	Cashier	2024-03-13	6000	1	Active	Male
\.


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (expense_id, amount, reason, date) FROM stdin;
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member (member_id, fullname, age, gender, contact_number, weight) FROM stdin;
19	natnael kebede	26	Male	978994822	62
20	fitsum tadele	24	Male	911405823	81
21	hana abera	22	Female	910789943	62
22	tsega hale	24	Female	911405823	62
23	hiwet tesfay	35	Female	911953710	62
\.


--
-- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership (membership_id, memebership_type, member_id, start_date, end_date, status, registration_date, account_id) FROM stdin;
17	Default	19	2024-03-23	2024-04-22	Active	2024-03-22	32
18	Gold	20	2024-03-25	2024-06-23	Active	2024-03-22	32
19	Gold	21	2024-03-22	2024-04-21	Active	2024-03-22	32
21	Default	23	2024-03-26	2024-04-03	Active	2024-03-25	32
20	Default	22	2024-03-28	2024-04-27	Active	2024-03-22	32
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (payment_id, membership_id, account_id, amount, payment_date, payment_type) FROM stdin;
7	17	32	2200	2024-03-22	\N
8	18	32	8000	2024-03-22	\N
9	19	32	2800	2024-03-25	registration
10	20	32	2200	2024-03-25	registration
11	20	32	2000	2024-03-25	Renewal
13	20	32	2000	2024-03-25	Renewal
\.


--
-- Name: accounts_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_account_id_seq', 35, true);


--
-- Name: admin_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_account_id_seq', 1, false);


--
-- Name: admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_admin_id_seq', 1, false);


--
-- Name: admin_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_emp_id_seq', 1, false);


--
-- Name: cashier_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cashier_account_id_seq', 1, false);


--
-- Name: cashier_cashier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cashier_cashier_id_seq', 1, false);


--
-- Name: cashier_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cashier_emp_id_seq', 1, false);


--
-- Name: employee_created_by_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_created_by_seq', 1, false);


--
-- Name: employee_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_emp_id_seq', 31, true);


--
-- Name: expense_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_expense_id_seq', 1, false);


--
-- Name: member_member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_member_id_seq', 23, true);


--
-- Name: membership_cashier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_cashier_id_seq', 1, false);


--
-- Name: membership_member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_member_id_seq', 1, false);


--
-- Name: membership_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_membership_id_seq', 21, true);


--
-- Name: payment_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_account_id_seq', 1, false);


--
-- Name: payment_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_membership_id_seq', 1, false);


--
-- Name: payment_paymnet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_paymnet_id_seq', 13, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- Name: accounts accounts_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_username_key UNIQUE (username);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: cashier cashier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT cashier_pkey PRIMARY KEY (cashier_id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_id);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (expense_id);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (member_id);


--
-- Name: membership membership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_pkey PRIMARY KEY (membership_id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- Name: employee fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT fk_account_id FOREIGN KEY (created_by) REFERENCES public.accounts(account_id);


--
-- Name: admin fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);


--
-- Name: cashier fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);


--
-- Name: payment fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);


--
-- Name: membership fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) NOT VALID;


--
-- Name: admin fk_emp_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);


--
-- Name: cashier fk_emp_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);


--
-- Name: accounts fk_emp_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);


--
-- Name: membership fk_memeber_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_memeber_id FOREIGN KEY (member_id) REFERENCES public.member(member_id);


--
-- Name: payment fk_memebership_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_memebership_id FOREIGN KEY (membership_id) REFERENCES public.membership(membership_id);


--
-- PostgreSQL database dump complete
--

