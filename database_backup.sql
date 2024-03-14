PGDMP         /                |            G-M-S    15.4    15.4 k    g           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            h           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            i           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            j           1262    32908    G-M-S    DATABASE     �   CREATE DATABASE "G-M-S" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "G-M-S";
                postgres    false            �            1259    32917    accounts    TABLE       CREATE TABLE public.accounts (
    account_id bigint NOT NULL,
    username character varying(30),
    password character varying(30) NOT NULL,
    role character varying(30) NOT NULL,
    status character varying(30) NOT NULL,
    created_date date NOT NULL,
    emp_id bigint
);
    DROP TABLE public.accounts;
       public         heap    postgres    false            �            1259    32916    accounts_account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accounts_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.accounts_account_id_seq;
       public          postgres    false    217            k           0    0    accounts_account_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.accounts_account_id_seq OWNED BY public.accounts.account_id;
          public          postgres    false    216            �            1259    33040    admin    TABLE     x   CREATE TABLE public.admin (
    admin_id bigint NOT NULL,
    account_id bigint NOT NULL,
    emp_id bigint NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    33038    admin_account_id_seq    SEQUENCE     }   CREATE SEQUENCE public.admin_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.admin_account_id_seq;
       public          postgres    false    224            l           0    0    admin_account_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.admin_account_id_seq OWNED BY public.admin.account_id;
          public          postgres    false    222            �            1259    33037    admin_admin_id_seq    SEQUENCE     {   CREATE SEQUENCE public.admin_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_admin_id_seq;
       public          postgres    false    224            m           0    0    admin_admin_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;
          public          postgres    false    221            �            1259    33039    admin_emp_id_seq    SEQUENCE     y   CREATE SEQUENCE public.admin_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.admin_emp_id_seq;
       public          postgres    false    224            n           0    0    admin_emp_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.admin_emp_id_seq OWNED BY public.admin.emp_id;
          public          postgres    false    223            �            1259    33083    cashier    TABLE     |   CREATE TABLE public.cashier (
    cashier_id bigint NOT NULL,
    account_id bigint NOT NULL,
    emp_id bigint NOT NULL
);
    DROP TABLE public.cashier;
       public         heap    postgres    false            �            1259    33081    cashier_account_id_seq    SEQUENCE        CREATE SEQUENCE public.cashier_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cashier_account_id_seq;
       public          postgres    false    230            o           0    0    cashier_account_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cashier_account_id_seq OWNED BY public.cashier.account_id;
          public          postgres    false    228            �            1259    33080    cashier_cashier_id_seq    SEQUENCE        CREATE SEQUENCE public.cashier_cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cashier_cashier_id_seq;
       public          postgres    false    230            p           0    0    cashier_cashier_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cashier_cashier_id_seq OWNED BY public.cashier.cashier_id;
          public          postgres    false    227            �            1259    33082    cashier_emp_id_seq    SEQUENCE     {   CREATE SEQUENCE public.cashier_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cashier_emp_id_seq;
       public          postgres    false    230            q           0    0    cashier_emp_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cashier_emp_id_seq OWNED BY public.cashier.emp_id;
          public          postgres    false    229            �            1259    33023    employee    TABLE     u  CREATE TABLE public.employee (
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
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    33022    employee_created_by_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_created_by_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.employee_created_by_seq;
       public          postgres    false    220            r           0    0    employee_created_by_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.employee_created_by_seq OWNED BY public.employee.created_by;
          public          postgres    false    219            �            1259    33021    employee_emp_id_seq    SEQUENCE     |   CREATE SEQUENCE public.employee_emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.employee_emp_id_seq;
       public          postgres    false    220            s           0    0    employee_emp_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.employee_emp_id_seq OWNED BY public.employee.emp_id;
          public          postgres    false    218            �            1259    33059    expense    TABLE     �   CREATE TABLE public.expense (
    expense_id bigint NOT NULL,
    amount numeric NOT NULL,
    reason character varying(150) NOT NULL,
    date date NOT NULL
);
    DROP TABLE public.expense;
       public         heap    postgres    false            �            1259    33058    expense_expense_id_seq    SEQUENCE        CREATE SEQUENCE public.expense_expense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.expense_expense_id_seq;
       public          postgres    false    226            t           0    0    expense_expense_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.expense_expense_id_seq OWNED BY public.expense.expense_id;
          public          postgres    false    225            �            1259    32910    member    TABLE     �   CREATE TABLE public.member (
    member_id bigint NOT NULL,
    fullname character varying(30) NOT NULL,
    age integer,
    gender character varying(15) NOT NULL,
    contact_number character varying(15) NOT NULL,
    weight double precision
);
    DROP TABLE public.member;
       public         heap    postgres    false            �            1259    32909    member_member_id_seq    SEQUENCE     }   CREATE SEQUENCE public.member_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.member_member_id_seq;
       public          postgres    false    215            u           0    0    member_member_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.member_member_id_seq OWNED BY public.member.member_id;
          public          postgres    false    214            �            1259    33122 
   membership    TABLE     D  CREATE TABLE public.membership (
    membership_id bigint NOT NULL,
    memebership_type character varying(30) NOT NULL,
    member_id bigint NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    status character varying(20) NOT NULL,
    registration_date date NOT NULL,
    cashier_id bigint NOT NULL
);
    DROP TABLE public.membership;
       public         heap    postgres    false            �            1259    33121    membership_cashier_id_seq    SEQUENCE     �   CREATE SEQUENCE public.membership_cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.membership_cashier_id_seq;
       public          postgres    false    234            v           0    0    membership_cashier_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.membership_cashier_id_seq OWNED BY public.membership.cashier_id;
          public          postgres    false    233            �            1259    33120    membership_member_id_seq    SEQUENCE     �   CREATE SEQUENCE public.membership_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.membership_member_id_seq;
       public          postgres    false    234            w           0    0    membership_member_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.membership_member_id_seq OWNED BY public.membership.member_id;
          public          postgres    false    232            �            1259    33119    membership_membership_id_seq    SEQUENCE     �   CREATE SEQUENCE public.membership_membership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.membership_membership_id_seq;
       public          postgres    false    234            x           0    0    membership_membership_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.membership_membership_id_seq OWNED BY public.membership.membership_id;
          public          postgres    false    231            �            1259    33166    payment    TABLE     �   CREATE TABLE public.payment (
    paymnet_id bigint NOT NULL,
    membership_id bigint NOT NULL,
    account_id bigint NOT NULL,
    amount numeric NOT NULL,
    payment_date date NOT NULL,
    payment_type character varying(30) NOT NULL
);
    DROP TABLE public.payment;
       public         heap    postgres    false            �            1259    33165    payment_account_id_seq    SEQUENCE        CREATE SEQUENCE public.payment_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_account_id_seq;
       public          postgres    false    238            y           0    0    payment_account_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_account_id_seq OWNED BY public.payment.account_id;
          public          postgres    false    237            �            1259    33164    payment_membership_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_membership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.payment_membership_id_seq;
       public          postgres    false    238            z           0    0    payment_membership_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.payment_membership_id_seq OWNED BY public.payment.membership_id;
          public          postgres    false    236            �            1259    33163    payment_paymnet_id_seq    SEQUENCE        CREATE SEQUENCE public.payment_paymnet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_paymnet_id_seq;
       public          postgres    false    238            {           0    0    payment_paymnet_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_paymnet_id_seq OWNED BY public.payment.paymnet_id;
          public          postgres    false    235            �           2604    32920    accounts account_id    DEFAULT     z   ALTER TABLE ONLY public.accounts ALTER COLUMN account_id SET DEFAULT nextval('public.accounts_account_id_seq'::regclass);
 B   ALTER TABLE public.accounts ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    33043    admin admin_id    DEFAULT     p   ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);
 =   ALTER TABLE public.admin ALTER COLUMN admin_id DROP DEFAULT;
       public          postgres    false    224    221    224            �           2604    33044    admin account_id    DEFAULT     t   ALTER TABLE ONLY public.admin ALTER COLUMN account_id SET DEFAULT nextval('public.admin_account_id_seq'::regclass);
 ?   ALTER TABLE public.admin ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    222    224    224            �           2604    33045    admin emp_id    DEFAULT     l   ALTER TABLE ONLY public.admin ALTER COLUMN emp_id SET DEFAULT nextval('public.admin_emp_id_seq'::regclass);
 ;   ALTER TABLE public.admin ALTER COLUMN emp_id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    33086    cashier cashier_id    DEFAULT     x   ALTER TABLE ONLY public.cashier ALTER COLUMN cashier_id SET DEFAULT nextval('public.cashier_cashier_id_seq'::regclass);
 A   ALTER TABLE public.cashier ALTER COLUMN cashier_id DROP DEFAULT;
       public          postgres    false    230    227    230            �           2604    33087    cashier account_id    DEFAULT     x   ALTER TABLE ONLY public.cashier ALTER COLUMN account_id SET DEFAULT nextval('public.cashier_account_id_seq'::regclass);
 A   ALTER TABLE public.cashier ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    230    228    230            �           2604    33088    cashier emp_id    DEFAULT     p   ALTER TABLE ONLY public.cashier ALTER COLUMN emp_id SET DEFAULT nextval('public.cashier_emp_id_seq'::regclass);
 =   ALTER TABLE public.cashier ALTER COLUMN emp_id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    33026    employee emp_id    DEFAULT     r   ALTER TABLE ONLY public.employee ALTER COLUMN emp_id SET DEFAULT nextval('public.employee_emp_id_seq'::regclass);
 >   ALTER TABLE public.employee ALTER COLUMN emp_id DROP DEFAULT;
       public          postgres    false    218    220    220            �           2604    33027    employee created_by    DEFAULT     z   ALTER TABLE ONLY public.employee ALTER COLUMN created_by SET DEFAULT nextval('public.employee_created_by_seq'::regclass);
 B   ALTER TABLE public.employee ALTER COLUMN created_by DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    33062    expense expense_id    DEFAULT     x   ALTER TABLE ONLY public.expense ALTER COLUMN expense_id SET DEFAULT nextval('public.expense_expense_id_seq'::regclass);
 A   ALTER TABLE public.expense ALTER COLUMN expense_id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    32913    member member_id    DEFAULT     t   ALTER TABLE ONLY public.member ALTER COLUMN member_id SET DEFAULT nextval('public.member_member_id_seq'::regclass);
 ?   ALTER TABLE public.member ALTER COLUMN member_id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    33125    membership membership_id    DEFAULT     �   ALTER TABLE ONLY public.membership ALTER COLUMN membership_id SET DEFAULT nextval('public.membership_membership_id_seq'::regclass);
 G   ALTER TABLE public.membership ALTER COLUMN membership_id DROP DEFAULT;
       public          postgres    false    231    234    234            �           2604    33126    membership member_id    DEFAULT     |   ALTER TABLE ONLY public.membership ALTER COLUMN member_id SET DEFAULT nextval('public.membership_member_id_seq'::regclass);
 C   ALTER TABLE public.membership ALTER COLUMN member_id DROP DEFAULT;
       public          postgres    false    234    232    234            �           2604    33127    membership cashier_id    DEFAULT     ~   ALTER TABLE ONLY public.membership ALTER COLUMN cashier_id SET DEFAULT nextval('public.membership_cashier_id_seq'::regclass);
 D   ALTER TABLE public.membership ALTER COLUMN cashier_id DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    33169    payment paymnet_id    DEFAULT     x   ALTER TABLE ONLY public.payment ALTER COLUMN paymnet_id SET DEFAULT nextval('public.payment_paymnet_id_seq'::regclass);
 A   ALTER TABLE public.payment ALTER COLUMN paymnet_id DROP DEFAULT;
       public          postgres    false    238    235    238            �           2604    33170    payment membership_id    DEFAULT     ~   ALTER TABLE ONLY public.payment ALTER COLUMN membership_id SET DEFAULT nextval('public.payment_membership_id_seq'::regclass);
 D   ALTER TABLE public.payment ALTER COLUMN membership_id DROP DEFAULT;
       public          postgres    false    236    238    238            �           2604    33171    payment account_id    DEFAULT     x   ALTER TABLE ONLY public.payment ALTER COLUMN account_id SET DEFAULT nextval('public.payment_account_id_seq'::regclass);
 A   ALTER TABLE public.payment ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    238    237    238            O          0    32917    accounts 
   TABLE DATA           f   COPY public.accounts (account_id, username, password, role, status, created_date, emp_id) FROM stdin;
    public          postgres    false    217   _{       V          0    33040    admin 
   TABLE DATA           =   COPY public.admin (admin_id, account_id, emp_id) FROM stdin;
    public          postgres    false    224   �{       \          0    33083    cashier 
   TABLE DATA           A   COPY public.cashier (cashier_id, account_id, emp_id) FROM stdin;
    public          postgres    false    230   �{       R          0    33023    employee 
   TABLE DATA           �   COPY public.employee (emp_id, fullname, contact_number, "position", start_date, sallery, created_by, status, gender) FROM stdin;
    public          postgres    false    220   |       X          0    33059    expense 
   TABLE DATA           C   COPY public.expense (expense_id, amount, reason, date) FROM stdin;
    public          postgres    false    226   �|       M          0    32910    member 
   TABLE DATA           Z   COPY public.member (member_id, fullname, age, gender, contact_number, weight) FROM stdin;
    public          postgres    false    215   �|       `          0    33122 
   membership 
   TABLE DATA           �   COPY public.membership (membership_id, memebership_type, member_id, start_date, end_date, status, registration_date, cashier_id) FROM stdin;
    public          postgres    false    234   �|       d          0    33166    payment 
   TABLE DATA           l   COPY public.payment (paymnet_id, membership_id, account_id, amount, payment_date, payment_type) FROM stdin;
    public          postgres    false    238   �|       |           0    0    accounts_account_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.accounts_account_id_seq', 35, true);
          public          postgres    false    216            }           0    0    admin_account_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_account_id_seq', 1, false);
          public          postgres    false    222            ~           0    0    admin_admin_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.admin_admin_id_seq', 1, false);
          public          postgres    false    221                       0    0    admin_emp_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.admin_emp_id_seq', 1, false);
          public          postgres    false    223            �           0    0    cashier_account_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cashier_account_id_seq', 1, false);
          public          postgres    false    228            �           0    0    cashier_cashier_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cashier_cashier_id_seq', 1, false);
          public          postgres    false    227            �           0    0    cashier_emp_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cashier_emp_id_seq', 1, false);
          public          postgres    false    229            �           0    0    employee_created_by_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.employee_created_by_seq', 1, false);
          public          postgres    false    219            �           0    0    employee_emp_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.employee_emp_id_seq', 31, true);
          public          postgres    false    218            �           0    0    expense_expense_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.expense_expense_id_seq', 1, false);
          public          postgres    false    225            �           0    0    member_member_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.member_member_id_seq', 1, false);
          public          postgres    false    214            �           0    0    membership_cashier_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.membership_cashier_id_seq', 1, false);
          public          postgres    false    233            �           0    0    membership_member_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.membership_member_id_seq', 1, false);
          public          postgres    false    232            �           0    0    membership_membership_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.membership_membership_id_seq', 1, false);
          public          postgres    false    231            �           0    0    payment_account_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_account_id_seq', 1, false);
          public          postgres    false    237            �           0    0    payment_membership_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.payment_membership_id_seq', 1, false);
          public          postgres    false    236            �           0    0    payment_paymnet_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_paymnet_id_seq', 1, false);
          public          postgres    false    235            �           2606    32922    accounts accounts_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);
 @   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_pkey;
       public            postgres    false    217            �           2606    32924    accounts accounts_username_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_username_key UNIQUE (username);
 H   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_username_key;
       public            postgres    false    217            �           2606    33047    admin admin_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    224            �           2606    33090    cashier cashier_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT cashier_pkey PRIMARY KEY (cashier_id);
 >   ALTER TABLE ONLY public.cashier DROP CONSTRAINT cashier_pkey;
       public            postgres    false    230            �           2606    33031    employee employee_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    220            �           2606    33066    expense expense_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (expense_id);
 >   ALTER TABLE ONLY public.expense DROP CONSTRAINT expense_pkey;
       public            postgres    false    226            �           2606    32915    member member_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (member_id);
 <   ALTER TABLE ONLY public.member DROP CONSTRAINT member_pkey;
       public            postgres    false    215            �           2606    33129    membership membership_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_pkey PRIMARY KEY (membership_id);
 D   ALTER TABLE ONLY public.membership DROP CONSTRAINT membership_pkey;
       public            postgres    false    234            �           2606    33175    payment payment_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (paymnet_id);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public            postgres    false    238            �           2606    33032    employee fk_account_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT fk_account_id FOREIGN KEY (created_by) REFERENCES public.accounts(account_id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT fk_account_id;
       public          postgres    false    217    3237    220            �           2606    33053    admin fk_account_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);
 =   ALTER TABLE ONLY public.admin DROP CONSTRAINT fk_account_id;
       public          postgres    false    217    3237    224            �           2606    33091    cashier fk_account_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);
 ?   ALTER TABLE ONLY public.cashier DROP CONSTRAINT fk_account_id;
       public          postgres    false    230    217    3237            �           2606    33176    payment fk_account_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);
 ?   ALTER TABLE ONLY public.payment DROP CONSTRAINT fk_account_id;
       public          postgres    false    217    238    3237            �           2606    33130    membership fk_cashier_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_cashier_id FOREIGN KEY (cashier_id) REFERENCES public.cashier(cashier_id);
 B   ALTER TABLE ONLY public.membership DROP CONSTRAINT fk_cashier_id;
       public          postgres    false    230    234    3247            �           2606    33048    admin fk_emp_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);
 9   ALTER TABLE ONLY public.admin DROP CONSTRAINT fk_emp_id;
       public          postgres    false    220    224    3241            �           2606    33096    cashier fk_emp_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);
 ;   ALTER TABLE ONLY public.cashier DROP CONSTRAINT fk_emp_id;
       public          postgres    false    3241    230    220            �           2606    33187    accounts fk_emp_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES public.employee(emp_id);
 <   ALTER TABLE ONLY public.accounts DROP CONSTRAINT fk_emp_id;
       public          postgres    false    220    217    3241            �           2606    33135    membership fk_memeber_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_memeber_id FOREIGN KEY (member_id) REFERENCES public.member(member_id);
 B   ALTER TABLE ONLY public.membership DROP CONSTRAINT fk_memeber_id;
       public          postgres    false    3235    215    234            �           2606    33181    payment fk_memebership_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_memebership_id FOREIGN KEY (membership_id) REFERENCES public.membership(membership_id);
 C   ALTER TABLE ONLY public.payment DROP CONSTRAINT fk_memebership_id;
       public          postgres    false    234    238    3249            O   o   x���1
�0F���sl�̘e۰�'�	*D�=��Vڿ��H������������u+�a6VPW�����X�إ[oհ�I����xX�D���˼�(�GuAD;��2i      V      x������ � �      \      x������ � �      R      x���A�@@�u{
.�i;(̒���l�ӄ�0<�q�L<��Ӓ�"k���3Ս�����}�	��*ɕ,p""`h�9>.6�`]B�_��[CҜԆ�a7�FƘ>�[=\߽4���î���E�      X      x������ � �      M      x������ � �      `      x������ � �      d      x������ � �     