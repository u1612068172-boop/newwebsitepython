/**
 * Multi-language support for Picanha para Familia & Lapicanha website.
 * Languages: English (default), Portuguese, Spanish, French.
 */

const TRANSLATIONS = {
  en: {
    // Nav
    nav_home: "Home",
    nav_restaurants: "Restaurants",
    nav_menus: "Menus",
    nav_order_online: "Order Online",
    nav_reserve: "Reserve a Table",
    nav_menu_suffix: "Menu",

    // Hero - index
    hero_eyebrow: "Setubal \u00b7 Portugal",
    hero_sub: "A Taste of Portugal in the Heart of Set\u00fabal",
    hero_desc: "From the freshest seafood of the Atlantic coast to premium grilled picanha \u2014 two distinct dining traditions, one authentic Portuguese soul.",
    hero_reserve: "Reserve a Table",
    hero_explore: "Explore Restaurants",
    hero_restaurants: "Restaurants",
    hero_dishes: "Dishes",
    hero_wines: "Wines",
    hero_scroll: "SCROLL",

    // Showcase section - index
    showcase_eyebrow: "Our Restaurants",
    showcase_title: "Two Houses, One Soul",
    showcase_sub: "Neighbours on Rua & Largo Jos\u00e9 Afonso \u2014 each a celebration of a distinct Portuguese tradition.",
    showcase_address: "Address",
    showcase_phone: "Phone",
    showcase_discover: "Discover",
    showcase_reserve: "Reserve a Table",

    // About section - index
    about_title: "About Us",
    about_lead: "Two restaurants. One passion. Authentic Portugal.",
    about_p1: "Located on the historic Rua & Largo Jos\u00e9 Afonso in Set\u00fabal, our two restaurants sit as neighbours \u2014 each a celebration of a different facet of Portuguese cuisine.",
    about_p2_casa: "Picanha para Familia brings you the freshest catch from the Atlantic \u2014 sea bream, cod, octopus, prawns \u2014 cooked with recipes passed down through generations of coastal cooks.",
    about_p2_lapicanha: "Lapicanha is our premium grill house. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides, wines, and a warm, rustic atmosphere.",
    about_book: "Book Your Table",
    about_menu_items: "Menu Items",
    about_passion: "Passion",

    // Visit section - index
    visit_title: "Visit Us in Set\u00fabal",
    visit_sub: "Both restaurants are located on Rua/Largo Jos\u00e9 Afonso \u2014 come for lunch at Picanha para Familia, return for dinner at Lapicanha.",
    visit_reserve: "Make a Reservation",

    // Restaurant page
    rest_reserve: "Reserve a Table",
    rest_view_menu: "View Menu",
    rest_gallery: "Gallery",
    rest_welcome: "Welcome",
    rest_cuisine: "Cuisine:",
    rest_explore_menu: "Explore Menu",
    rest_contact: "Contact",
    rest_visit: "Visit Us",
    rest_address: "Address",
    rest_phone: "Phone",
    rest_email: "Email",
    rest_instagram: "Instagram",
    rest_hours_title: "Opening Hours",
    rest_menu_title: "Our Menu",
    rest_menu_sub: "Explore the full selection at",
    rest_policies: "Good to Know",
    rest_gallery_title: "Gallery",
    rest_gallery_sub: "A glimpse of what awaits you at",
    rest_cta_title: "Ready to Experience",
    rest_cta_sub: "Book your table today \u2014 we look forward to welcoming you.",
    rest_reserve_now: "Reserve Now",

    // Menu page
    menu_title: "Our Menu",
    menu_footer: "All prices include VAT. Menu and prices subject to change without notice.",
    menu_reserve: "Reserve a Table",

    // Gallery page
    gallery_title: "Gallery",
    gallery_sub: "A glimpse of our dining experience",
    gallery_coming_soon: "Photo gallery coming soon. Follow us on social media for the latest pictures of our dishes and atmosphere.",
    gallery_instagram: "Follow on Instagram",
    gallery_photo: "Photo",

    // Contact page
    contact_title: "Contact & Location",
    contact_sub: "We'd love to hear from you",
    contact_get_in_touch: "Get in Touch",
    contact_address: "Address",
    contact_phone: "Phone",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_instagram: "Instagram",
    contact_hours: "Hours",
    contact_reserve: "Reserve a Table",

    // Reservations page
    res_eyebrow: "Book Your Experience",
    res_title: "Reserve a Table",
    res_sub: "At either of our two Set\u00fabal restaurants",
    res_restaurant: "Restaurant",
    res_choose: "\u2014 Choose a restaurant \u2014",
    res_name: "Full Name",
    res_email: "Email",
    res_phone: "Phone",
    res_guests: "Number of Guests",
    res_date: "Date",
    res_time: "Time",
    res_special: "Special Requests",
    res_special_placeholder: "Dietary restrictions, seating preferences, special occasions...",
    res_submit: "Confirm Reservation",
    res_note: "* Required fields. We'll confirm your reservation by email shortly.",
    res_choosing: "Choosing a Restaurant?",
    res_learn_more: "Learn more \u2192",

    // Order page
    order_title: "Order Online",
    order_add: "+ Add",
    order_your_order: "Your Order",
    order_items: "items",
    order_item: "item",
    order_cart_empty: "Your cart is empty. Browse the menu and add items.",
    order_total: "Total",
    order_your_details: "Your Details",
    order_name: "Full Name",
    order_email: "Email",
    order_phone: "Phone",
    order_type: "Order Type",
    order_takeaway: "Takeaway",
    order_takeaway_desc: "Pick up at the restaurant",
    order_delivery: "Delivery",
    order_delivery_desc: "Delivered to your address",
    order_dinein: "Dine-in Pre-order",
    order_dinein_desc: "Have it ready when you arrive",
    order_delivery_address: "Delivery Address",
    order_delivery_placeholder: "Street, city, postal code...",
    order_special: "Special Requests",
    order_special_placeholder: "Dietary restrictions, allergies...",
    order_submit: "Proceed to Payment",
    order_stripe_note: "You'll be redirected to Stripe for secure payment.",

    // Order success
    osuccess_title: "Order Confirmed!",
    osuccess_sub: "Thank you for your order",
    osuccess_thank: "Thank you,",
    osuccess_received: "Your order has been received and payment confirmed.",
    osuccess_order_num: "Order #",
    osuccess_restaurant: "Restaurant",
    osuccess_type: "Order Type",
    osuccess_delivery_to: "Delivery To",
    osuccess_items: "Items Ordered",
    osuccess_total: "Total Paid",
    osuccess_special: "Special Requests:",
    osuccess_note: "The restaurant has been notified and will begin preparing your order shortly.",
    osuccess_back: "Back to Restaurant",
    osuccess_home: "Home",

    // About page
    aboutp_eyebrow: "Our Story",
    aboutp_title: "About Our Restaurants",
    aboutp_sub: "Two authentic Portuguese dining experiences in Set\u00fabal",
    aboutp_lead: "Welcome \u2014 home to two beloved Portuguese establishments in the heart of Set\u00fabal.",
    aboutp_desc: "Located neighbours on the historic Rua & Largo Jos\u00e9 Afonso, our restaurants offer visitors the chance to experience two distinct facets of Portuguese cuisine: the bounty of the Atlantic coast and the tradition of the rustic grill.",
    aboutp_visit: "Visit",

    // 404
    e404_sub: "The page you're looking for doesn't exist.",
    e404_back: "Back to Home",

    // Footer
    footer_desc: "Two authentic Portuguese dining experiences in Set\u00fabal. From fresh coastal seafood to premium grilled picanha.",
    footer_links: "Quick Links",
    footer_reservations: "Reservations",
    footer_copyright: "Picanha para Familia & Lapicanha \u00b7 Set\u00fabal, Portugal. All rights reserved.",

    // Days
    day_monday: "Monday",
    day_tuesday: "Tuesday",
    day_wednesday: "Wednesday",
    day_thursday: "Thursday",
    day_friday: "Friday",
    day_saturday: "Saturday",
    day_sunday: "Sunday",
    day_closed: "CLOSED",

    // Restaurant-specific
    r_casa_da_peixe_tagline: "Fresh seafood and Portuguese coastal flavors",
    r_casa_da_peixe_type: "Seafood / Portuguese Coastal Cuisine",
    r_casa_da_peixe_description: "Specializing in the freshest seafood and traditional Portuguese coastal cuisine. Our dishes celebrate the bounty of the sea with authentic recipes passed down through generations of fishermen and coastal cooks.",
    r_lapicanha_tagline: "Premium grilled meats and traditional flavors",
    r_lapicanha_sub_tagline: "A MEAT RESTAURANT",
    r_lapicanha_type: "Premium Grill / Steakhouse / Portuguese-Brazilian Fusion",
    r_lapicanha_description: "Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.",

    // Language selector
    lang_label: "Language",
  },

  pt: {
    nav_home: "In\u00edcio",
    nav_restaurants: "Restaurantes",
    nav_menus: "Menus",
    nav_order_online: "Pedir Online",
    nav_reserve: "Reservar Mesa",
    nav_menu_suffix: "Menu",

    hero_eyebrow: "Set\u00fabal \u00b7 Portugal",
    hero_sub: "O Sabor de Portugal no Cora\u00e7\u00e3o de Set\u00fabal",
    hero_desc: "Do marisco mais fresco da costa Atl\u00e2ntica \u00e0 picanha grelhada premium \u2014 duas tradi\u00e7\u00f5es gastron\u00f3micas distintas, uma alma portuguesa aut\u00eantica.",
    hero_reserve: "Reservar Mesa",
    hero_explore: "Explorar Restaurantes",
    hero_restaurants: "Restaurantes",
    hero_dishes: "Pratos",
    hero_wines: "Vinhos",
    hero_scroll: "ROLAR",

    showcase_eyebrow: "Os Nossos Restaurantes",
    showcase_title: "Duas Casas, Uma Alma",
    showcase_sub: "Vizinhos na Rua & Largo Jos\u00e9 Afonso \u2014 cada um celebra uma tradi\u00e7\u00e3o portuguesa distinta.",
    showcase_address: "Morada",
    showcase_phone: "Telefone",
    showcase_discover: "Descobrir",
    showcase_reserve: "Reservar Mesa",

    about_title: "Sobre N\u00f3s",
    about_lead: "Dois restaurantes. Uma paix\u00e3o. Portugal aut\u00eantico.",
    about_p1: "Situados na hist\u00f3rica Rua & Largo Jos\u00e9 Afonso em Set\u00fabal, os nossos dois restaurantes s\u00e3o vizinhos \u2014 cada um celebra uma faceta diferente da cozinha portuguesa.",
    about_p2_casa: "O Picanha para Familia traz-lhe o mais fresco do Atl\u00e2ntico \u2014 dourada, bacalhau, polvo, cama\u00e3o \u2014 cozinhados com receitas transmitidas por gera\u00e7\u00f5es de cozinheiros costeiros.",
    about_p2_lapicanha: "O Lapicanha \u00e9 a nossa casa de grelhados premium. Especializamo-nos em picanha perfeitamente preparada e outros cortes nobres, acompanhados de guarnições portuguesas, vinhos e um ambiente r\u00fastico e acolhedor.",
    about_book: "Reserve a Sua Mesa",
    about_menu_items: "Pratos",
    about_passion: "Paix\u00e3o",

    visit_title: "Visite-nos em Set\u00fabal",
    visit_sub: "Ambos os restaurantes est\u00e3o localizados na Rua/Largo Jos\u00e9 Afonso \u2014 venha almo\u00e7ar no Picanha para Familia e volte para jantar no Lapicanha.",
    visit_reserve: "Fazer Reserva",

    rest_reserve: "Reservar Mesa",
    rest_view_menu: "Ver Menu",
    rest_gallery: "Galeria",
    rest_welcome: "Bem-vindo",
    rest_cuisine: "Cozinha:",
    rest_explore_menu: "Explorar Menu",
    rest_contact: "Contacto",
    rest_visit: "Visite-nos",
    rest_address: "Morada",
    rest_phone: "Telefone",
    rest_email: "Email",
    rest_instagram: "Instagram",
    rest_hours_title: "Hor\u00e1rio de Funcionamento",
    rest_menu_title: "O Nosso Menu",
    rest_menu_sub: "Explore a sele\u00e7\u00e3o completa no",
    rest_policies: "Bom Saber",
    rest_gallery_title: "Galeria",
    rest_gallery_sub: "Um vislumbre do que o espera no",
    rest_cta_title: "Pronto para Experimentar o",
    rest_cta_sub: "Reserve a sua mesa hoje \u2014 esperamos receb\u00ea-lo.",
    rest_reserve_now: "Reservar Agora",

    menu_title: "O Nosso Menu",
    menu_footer: "Todos os pre\u00e7os incluem IVA. Menu e pre\u00e7os sujeitos a altera\u00e7\u00e3o sem aviso pr\u00e9vio.",
    menu_reserve: "Reservar Mesa",

    gallery_title: "Galeria",
    gallery_sub: "Um vislumbre da nossa experi\u00eancia gastron\u00f3mica",
    gallery_coming_soon: "Galeria de fotos em breve. Siga-nos nas redes sociais para as \u00faltimas fotos dos nossos pratos e ambiente.",
    gallery_instagram: "Seguir no Instagram",
    gallery_photo: "Foto",

    contact_title: "Contacto e Localiza\u00e7\u00e3o",
    contact_sub: "Gostar\u00edamos de ouvir de si",
    contact_get_in_touch: "Entre em Contacto",
    contact_address: "Morada",
    contact_phone: "Telefone",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_instagram: "Instagram",
    contact_hours: "Hor\u00e1rio",
    contact_reserve: "Reservar Mesa",

    res_eyebrow: "Reserve a Sua Experi\u00eancia",
    res_title: "Reservar Mesa",
    res_sub: "Em qualquer dos nossos dois restaurantes em Set\u00fabal",
    res_restaurant: "Restaurante",
    res_choose: "\u2014 Escolha um restaurante \u2014",
    res_name: "Nome Completo",
    res_email: "Email",
    res_phone: "Telefone",
    res_guests: "N\u00famero de Pessoas",
    res_date: "Data",
    res_time: "Hora",
    res_special: "Pedidos Especiais",
    res_special_placeholder: "Restri\u00e7\u00f5es diet\u00e9ticas, prefer\u00eancias de lugar, ocasi\u00f5es especiais...",
    res_submit: "Confirmar Reserva",
    res_note: "* Campos obrigat\u00f3rios. Confirmaremos a sua reserva por email em breve.",
    res_choosing: "A Escolher Restaurante?",
    res_learn_more: "Saber mais \u2192",

    order_title: "Pedir Online",
    order_add: "+ Adicionar",
    order_your_order: "O Seu Pedido",
    order_items: "itens",
    order_item: "item",
    order_cart_empty: "O seu carrinho est\u00e1 vazio. Navegue no menu e adicione itens.",
    order_total: "Total",
    order_your_details: "Os Seus Dados",
    order_name: "Nome Completo",
    order_email: "Email",
    order_phone: "Telefone",
    order_type: "Tipo de Pedido",
    order_takeaway: "Takeaway",
    order_takeaway_desc: "Levantar no restaurante",
    order_delivery: "Entrega",
    order_delivery_desc: "Entregue na sua morada",
    order_dinein: "Pr\u00e9-pedido Mesa",
    order_dinein_desc: "Pronto quando chegar",
    order_delivery_address: "Morada de Entrega",
    order_delivery_placeholder: "Rua, cidade, c\u00f3digo postal...",
    order_special: "Pedidos Especiais",
    order_special_placeholder: "Restri\u00e7\u00f5es diet\u00e9ticas, alergias...",
    order_submit: "Prosseguir para Pagamento",
    order_stripe_note: "Ser\u00e1 redirecionado para o Stripe para pagamento seguro.",

    osuccess_title: "Pedido Confirmado!",
    osuccess_sub: "Obrigado pelo seu pedido",
    osuccess_thank: "Obrigado,",
    osuccess_received: "O seu pedido foi recebido e o pagamento confirmado.",
    osuccess_order_num: "Pedido #",
    osuccess_restaurant: "Restaurante",
    osuccess_type: "Tipo de Pedido",
    osuccess_delivery_to: "Entregar Em",
    osuccess_items: "Itens Pedidos",
    osuccess_total: "Total Pago",
    osuccess_special: "Pedidos Especiais:",
    osuccess_note: "O restaurante foi notificado e comecar\u00e1 a preparar o seu pedido em breve.",
    osuccess_back: "Voltar ao Restaurante",
    osuccess_home: "In\u00edcio",

    aboutp_eyebrow: "A Nossa Hist\u00f3ria",
    aboutp_title: "Sobre os Nossos Restaurantes",
    aboutp_sub: "Duas experi\u00eancias gastron\u00f3micas portuguesas aut\u00eanticas em Set\u00fabal",
    aboutp_lead: "Bem-vindo \u2014 casa de dois queridos estabelecimentos portugueses no cora\u00e7\u00e3o de Set\u00fabal.",
    aboutp_desc: "Vizinhos na hist\u00f3rica Rua & Largo Jos\u00e9 Afonso, os nossos restaurantes oferecem aos visitantes a oportunidade de experimentar duas facetas distintas da cozinha portuguesa: a riqueza da costa Atl\u00e2ntica e a tradi\u00e7\u00e3o da grelha r\u00fastica.",
    aboutp_visit: "Visitar",

    e404_sub: "A p\u00e1gina que procura n\u00e3o existe.",
    e404_back: "Voltar ao In\u00edcio",

    footer_desc: "Duas experi\u00eancias gastron\u00f3micas portuguesas aut\u00eanticas em Set\u00fabal. Do marisco fresco da costa \u00e0 picanha grelhada premium.",
    footer_links: "Links R\u00e1pidos",
    footer_reservations: "Reservas",
    footer_copyright: "Picanha para Familia & Lapicanha \u00b7 Set\u00fabal, Portugal. Todos os direitos reservados.",

    day_monday: "Segunda-feira",
    day_tuesday: "Ter\u00e7a-feira",
    day_wednesday: "Quarta-feira",
    day_thursday: "Quinta-feira",
    day_friday: "Sexta-feira",
    day_saturday: "S\u00e1bado",
    day_sunday: "Domingo",
    day_closed: "FECHADO",

    r_casa_da_peixe_tagline: "Marisco fresco e sabores costeiros portugueses",
    r_casa_da_peixe_type: "Marisco / Cozinha Costeira Portuguesa",
    r_casa_da_peixe_description: "Especializado no marisco mais fresco e na cozinha costeira tradicional portuguesa. Os nossos pratos celebram a riqueza do mar com receitas aut\u00eanticas transmitidas por gera\u00e7\u00f5es de pescadores e cozinheiros costeiros.",
    r_lapicanha_tagline: "Carnes grelhadas premium e sabores tradicionais",
    r_lapicanha_sub_tagline: "UM RESTAURANTE DE CARNE",
    r_lapicanha_type: "Grelha Premium / Steakhouse / Fus\u00e3o Portuguesa-Brasileira",
    r_lapicanha_description: "Carnes grelhadas premium e sabores tradicionais portugueses num ambiente r\u00fastico e acolhedor. Especializamo-nos em picanha perfeitamente preparada e outros cortes nobres, acompanhados de guarni\u00e7\u00f5es portuguesas aut\u00eanticas e vinhos.",

    lang_label: "Idioma",
  },

  es: {
    nav_home: "Inicio",
    nav_restaurants: "Restaurantes",
    nav_menus: "Men\u00fas",
    nav_order_online: "Pedir Online",
    nav_reserve: "Reservar Mesa",
    nav_menu_suffix: "Men\u00fa",

    hero_eyebrow: "Set\u00fabal \u00b7 Portugal",
    hero_sub: "El Sabor de Portugal en el Coraz\u00f3n de Set\u00fabal",
    hero_desc: "Del marisco m\u00e1s fresco de la costa atl\u00e1ntica a la picanha a la parrilla premium \u2014 dos tradiciones gastron\u00f3micas distintas, un alma portuguesa aut\u00e9ntica.",
    hero_reserve: "Reservar Mesa",
    hero_explore: "Explorar Restaurantes",
    hero_restaurants: "Restaurantes",
    hero_dishes: "Platos",
    hero_wines: "Vinos",
    hero_scroll: "DESPLAZAR",

    showcase_eyebrow: "Nuestros Restaurantes",
    showcase_title: "Dos Casas, Un Alma",
    showcase_sub: "Vecinos en Rua & Largo Jos\u00e9 Afonso \u2014 cada uno celebra una tradici\u00f3n portuguesa distinta.",
    showcase_address: "Direcci\u00f3n",
    showcase_phone: "Tel\u00e9fono",
    showcase_discover: "Descubrir",
    showcase_reserve: "Reservar Mesa",

    about_title: "Sobre Nosotros",
    about_lead: "Dos restaurantes. Una pasi\u00f3n. Portugal aut\u00e9ntico.",
    about_p1: "Ubicados en la hist\u00f3rica Rua & Largo Jos\u00e9 Afonso en Set\u00fabal, nuestros dos restaurantes son vecinos \u2014 cada uno celebra una faceta diferente de la cocina portuguesa.",
    about_p2_casa: "Picanha para Familia le trae lo m\u00e1s fresco del Atl\u00e1ntico \u2014 dorada, bacalao, pulpo, gambas \u2014 cocinado con recetas transmitidas por generaciones de cocineros costeros.",
    about_p2_lapicanha: "Lapicanha es nuestra casa de parrilla premium. Nos especializamos en picanha perfectamente preparada y otros cortes selectos, acompa\u00f1ados de guarniciones portuguesas, vinos y un ambiente r\u00fastico y acogedor.",
    about_book: "Reserve Su Mesa",
    about_menu_items: "Platos",
    about_passion: "Pasi\u00f3n",

    visit_title: "Vis\u00edtenos en Set\u00fabal",
    visit_sub: "Ambos restaurantes est\u00e1n ubicados en Rua/Largo Jos\u00e9 Afonso \u2014 venga a almorzar al Picanha para Familia y vuelva a cenar al Lapicanha.",
    visit_reserve: "Hacer Reserva",

    rest_reserve: "Reservar Mesa",
    rest_view_menu: "Ver Men\u00fa",
    rest_gallery: "Galer\u00eda",
    rest_welcome: "Bienvenido",
    rest_cuisine: "Cocina:",
    rest_explore_menu: "Explorar Men\u00fa",
    rest_contact: "Contacto",
    rest_visit: "Vis\u00edtenos",
    rest_address: "Direcci\u00f3n",
    rest_phone: "Tel\u00e9fono",
    rest_email: "Email",
    rest_instagram: "Instagram",
    rest_hours_title: "Horario de Apertura",
    rest_menu_title: "Nuestro Men\u00fa",
    rest_menu_sub: "Explore la selecci\u00f3n completa en",
    rest_policies: "Bueno Saber",
    rest_gallery_title: "Galer\u00eda",
    rest_gallery_sub: "Un vistazo de lo que le espera en",
    rest_cta_title: "Listo para Descubrir",
    rest_cta_sub: "Reserve su mesa hoy \u2014 esperamos darle la bienvenida.",
    rest_reserve_now: "Reservar Ahora",

    menu_title: "Nuestro Men\u00fa",
    menu_footer: "Todos los precios incluyen IVA. Men\u00fa y precios sujetos a cambios sin previo aviso.",
    menu_reserve: "Reservar Mesa",

    gallery_title: "Galer\u00eda",
    gallery_sub: "Un vistazo de nuestra experiencia gastron\u00f3mica",
    gallery_coming_soon: "Galer\u00eda de fotos pr\u00f3ximamente. S\u00edganos en redes sociales para las \u00faltimas fotos de nuestros platos y ambiente.",
    gallery_instagram: "Seguir en Instagram",
    gallery_photo: "Foto",

    contact_title: "Contacto y Ubicaci\u00f3n",
    contact_sub: "Nos encantar\u00eda saber de usted",
    contact_get_in_touch: "P\u00f3ngase en Contacto",
    contact_address: "Direcci\u00f3n",
    contact_phone: "Tel\u00e9fono",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_instagram: "Instagram",
    contact_hours: "Horario",
    contact_reserve: "Reservar Mesa",

    res_eyebrow: "Reserve Su Experiencia",
    res_title: "Reservar Mesa",
    res_sub: "En cualquiera de nuestros dos restaurantes en Set\u00fabal",
    res_restaurant: "Restaurante",
    res_choose: "\u2014 Elija un restaurante \u2014",
    res_name: "Nombre Completo",
    res_email: "Email",
    res_phone: "Tel\u00e9fono",
    res_guests: "N\u00famero de Comensales",
    res_date: "Fecha",
    res_time: "Hora",
    res_special: "Peticiones Especiales",
    res_special_placeholder: "Restricciones diet\u00e9ticas, preferencias de asiento, ocasiones especiales...",
    res_submit: "Confirmar Reserva",
    res_note: "* Campos obligatorios. Confirmaremos su reserva por email en breve.",
    res_choosing: "\u00bfEligiendo Restaurante?",
    res_learn_more: "Saber m\u00e1s \u2192",

    order_title: "Pedir Online",
    order_add: "+ A\u00f1adir",
    order_your_order: "Su Pedido",
    order_items: "art\u00edculos",
    order_item: "art\u00edculo",
    order_cart_empty: "Su carrito est\u00e1 vac\u00edo. Navegue por el men\u00fa y a\u00f1ada art\u00edculos.",
    order_total: "Total",
    order_your_details: "Sus Datos",
    order_name: "Nombre Completo",
    order_email: "Email",
    order_phone: "Tel\u00e9fono",
    order_type: "Tipo de Pedido",
    order_takeaway: "Para Llevar",
    order_takeaway_desc: "Recoger en el restaurante",
    order_delivery: "Entrega",
    order_delivery_desc: "Entregado en su direcci\u00f3n",
    order_dinein: "Pre-pedido Mesa",
    order_dinein_desc: "Listo cuando llegue",
    order_delivery_address: "Direcci\u00f3n de Entrega",
    order_delivery_placeholder: "Calle, ciudad, c\u00f3digo postal...",
    order_special: "Peticiones Especiales",
    order_special_placeholder: "Restricciones diet\u00e9ticas, alergias...",
    order_submit: "Proceder al Pago",
    order_stripe_note: "Ser\u00e1 redirigido a Stripe para un pago seguro.",

    osuccess_title: "\u00a1Pedido Confirmado!",
    osuccess_sub: "Gracias por su pedido",
    osuccess_thank: "Gracias,",
    osuccess_received: "Su pedido ha sido recibido y el pago confirmado.",
    osuccess_order_num: "Pedido #",
    osuccess_restaurant: "Restaurante",
    osuccess_type: "Tipo de Pedido",
    osuccess_delivery_to: "Entregar En",
    osuccess_items: "Art\u00edculos Pedidos",
    osuccess_total: "Total Pagado",
    osuccess_special: "Peticiones Especiales:",
    osuccess_note: "El restaurante ha sido notificado y comenzar\u00e1 a preparar su pedido en breve.",
    osuccess_back: "Volver al Restaurante",
    osuccess_home: "Inicio",

    aboutp_eyebrow: "Nuestra Historia",
    aboutp_title: "Sobre Nuestros Restaurantes",
    aboutp_sub: "Dos experiencias gastron\u00f3micas portuguesas aut\u00e9nticas en Set\u00fabal",
    aboutp_lead: "Bienvenido \u2014 hogar de dos queridos establecimientos portugueses en el coraz\u00f3n de Set\u00fabal.",
    aboutp_desc: "Vecinos en la hist\u00f3rica Rua & Largo Jos\u00e9 Afonso, nuestros restaurantes ofrecen a los visitantes la oportunidad de experimentar dos facetas distintas de la cocina portuguesa: la riqueza de la costa Atl\u00e1ntica y la tradici\u00f3n de la parrilla r\u00fastica.",
    aboutp_visit: "Visitar",

    e404_sub: "La p\u00e1gina que busca no existe.",
    e404_back: "Volver al Inicio",

    footer_desc: "Dos experiencias gastron\u00f3micas portuguesas aut\u00e9nticas en Set\u00fabal. Del marisco fresco de la costa a la picanha a la parrilla premium.",
    footer_links: "Enlaces R\u00e1pidos",
    footer_reservations: "Reservas",
    footer_copyright: "Picanha para Familia & Lapicanha \u00b7 Set\u00fabal, Portugal. Todos los derechos reservados.",

    day_monday: "Lunes",
    day_tuesday: "Martes",
    day_wednesday: "Mi\u00e9rcoles",
    day_thursday: "Jueves",
    day_friday: "Viernes",
    day_saturday: "S\u00e1bado",
    day_sunday: "Domingo",
    day_closed: "CERRADO",

    r_casa_da_peixe_tagline: "Marisco fresco y sabores costeros portugueses",
    r_casa_da_peixe_type: "Marisco / Cocina Costera Portuguesa",
    r_casa_da_peixe_description: "Especializado en el marisco m\u00e1s fresco y la cocina costera tradicional portuguesa. Nuestros platos celebran la riqueza del mar con recetas aut\u00e9nticas transmitidas por generaciones de pescadores y cocineros costeros.",
    r_lapicanha_tagline: "Carnes a la parrilla premium y sabores tradicionales",
    r_lapicanha_sub_tagline: "UN RESTAURANTE DE CARNE",
    r_lapicanha_type: "Parrilla Premium / Steakhouse / Fusi\u00f3n Portuguesa-Brasile\u00f1a",
    r_lapicanha_description: "Carnes a la parrilla premium y sabores tradicionales portugueses en un ambiente r\u00fastico y acogedor. Nos especializamos en picanha perfectamente preparada y otros cortes selectos, acompa\u00f1ados de guarniciones portuguesas aut\u00e9nticas y vinos.",

    lang_label: "Idioma",
  },

  fr: {
    nav_home: "Accueil",
    nav_restaurants: "Restaurants",
    nav_menus: "Menus",
    nav_order_online: "Commander",
    nav_reserve: "R\u00e9server",
    nav_menu_suffix: "Menu",

    hero_eyebrow: "Set\u00fabal \u00b7 Portugal",
    hero_sub: "Le Go\u00fbt du Portugal au C\u0153ur de Set\u00fabal",
    hero_desc: "Des fruits de mer les plus frais de la c\u00f4te atlantique au picanha grill\u00e9 premium \u2014 deux traditions culinaires distinctes, une \u00e2me portugaise authentique.",
    hero_reserve: "R\u00e9server une Table",
    hero_explore: "Explorer les Restaurants",
    hero_restaurants: "Restaurants",
    hero_dishes: "Plats",
    hero_wines: "Vins",
    hero_scroll: "D\u00c9FILER",

    showcase_eyebrow: "Nos Restaurants",
    showcase_title: "Deux Maisons, Une \u00c2me",
    showcase_sub: "Voisins sur Rua & Largo Jos\u00e9 Afonso \u2014 chacun c\u00e9l\u00e8bre une tradition portugaise distincte.",
    showcase_address: "Adresse",
    showcase_phone: "T\u00e9l\u00e9phone",
    showcase_discover: "D\u00e9couvrir",
    showcase_reserve: "R\u00e9server une Table",

    about_title: "\u00c0 Propos",
    about_lead: "Deux restaurants. Une passion. Le Portugal authentique.",
    about_p1: "Situ\u00e9s sur la historique Rua & Largo Jos\u00e9 Afonso \u00e0 Set\u00fabal, nos deux restaurants sont voisins \u2014 chacun c\u00e9l\u00e8bre une facette diff\u00e9rente de la cuisine portugaise.",
    about_p2_casa: "Picanha para Familia vous apporte le plus frais de l'Atlantique \u2014 dorade, morue, poulpe, crevettes \u2014 cuisin\u00e9s avec des recettes transmises par des g\u00e9n\u00e9rations de cuisiniers c\u00f4tiers.",
    about_p2_lapicanha: "Lapicanha est notre maison de grillade premium. Nous nous sp\u00e9cialisons dans la picanha parfaitement pr\u00e9par\u00e9e et d'autres coupes nobles, accompagn\u00e9es de garnitures portugaises, vins et une atmosph\u00e8re rustique et chaleureuse.",
    about_book: "R\u00e9servez Votre Table",
    about_menu_items: "Plats",
    about_passion: "Passion",

    visit_title: "Visitez-nous \u00e0 Set\u00fabal",
    visit_sub: "Les deux restaurants sont situ\u00e9s sur Rua/Largo Jos\u00e9 Afonso \u2014 venez d\u00e9jeuner au Picanha para Familia, revenez d\u00eener au Lapicanha.",
    visit_reserve: "Faire une R\u00e9servation",

    rest_reserve: "R\u00e9server une Table",
    rest_view_menu: "Voir le Menu",
    rest_gallery: "Galerie",
    rest_welcome: "Bienvenue",
    rest_cuisine: "Cuisine :",
    rest_explore_menu: "Explorer le Menu",
    rest_contact: "Contact",
    rest_visit: "Visitez-nous",
    rest_address: "Adresse",
    rest_phone: "T\u00e9l\u00e9phone",
    rest_email: "Email",
    rest_instagram: "Instagram",
    rest_hours_title: "Horaires d'Ouverture",
    rest_menu_title: "Notre Menu",
    rest_menu_sub: "Explorez la s\u00e9lection compl\u00e8te au",
    rest_policies: "Bon \u00e0 Savoir",
    rest_gallery_title: "Galerie",
    rest_gallery_sub: "Un aper\u00e7u de ce qui vous attend au",
    rest_cta_title: "Pr\u00eat \u00e0 D\u00e9couvrir",
    rest_cta_sub: "R\u00e9servez votre table aujourd'hui \u2014 nous avons h\u00e2te de vous accueillir.",
    rest_reserve_now: "R\u00e9server Maintenant",

    menu_title: "Notre Menu",
    menu_footer: "Tous les prix incluent la TVA. Menu et prix susceptibles de changer sans pr\u00e9avis.",
    menu_reserve: "R\u00e9server une Table",

    gallery_title: "Galerie",
    gallery_sub: "Un aper\u00e7u de notre exp\u00e9rience culinaire",
    gallery_coming_soon: "Galerie photo bient\u00f4t disponible. Suivez-nous sur les r\u00e9seaux sociaux pour les derni\u00e8res photos de nos plats et de notre ambiance.",
    gallery_instagram: "Suivre sur Instagram",
    gallery_photo: "Photo",

    contact_title: "Contact et Localisation",
    contact_sub: "Nous serions ravis de vous entendre",
    contact_get_in_touch: "Contactez-nous",
    contact_address: "Adresse",
    contact_phone: "T\u00e9l\u00e9phone",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_instagram: "Instagram",
    contact_hours: "Horaires",
    contact_reserve: "R\u00e9server une Table",

    res_eyebrow: "R\u00e9servez Votre Exp\u00e9rience",
    res_title: "R\u00e9server une Table",
    res_sub: "Dans l'un de nos deux restaurants \u00e0 Set\u00fabal",
    res_restaurant: "Restaurant",
    res_choose: "\u2014 Choisissez un restaurant \u2014",
    res_name: "Nom Complet",
    res_email: "Email",
    res_phone: "T\u00e9l\u00e9phone",
    res_guests: "Nombre de Convives",
    res_date: "Date",
    res_time: "Heure",
    res_special: "Demandes Sp\u00e9ciales",
    res_special_placeholder: "Restrictions alimentaires, pr\u00e9f\u00e9rences de place, occasions sp\u00e9ciales...",
    res_submit: "Confirmer la R\u00e9servation",
    res_note: "* Champs obligatoires. Nous confirmerons votre r\u00e9servation par email sous peu.",
    res_choosing: "Vous H\u00e9sitez ?",
    res_learn_more: "En savoir plus \u2192",

    order_title: "Commander en Ligne",
    order_add: "+ Ajouter",
    order_your_order: "Votre Commande",
    order_items: "articles",
    order_item: "article",
    order_cart_empty: "Votre panier est vide. Parcourez le menu et ajoutez des articles.",
    order_total: "Total",
    order_your_details: "Vos Coordonn\u00e9es",
    order_name: "Nom Complet",
    order_email: "Email",
    order_phone: "T\u00e9l\u00e9phone",
    order_type: "Type de Commande",
    order_takeaway: "\u00c0 Emporter",
    order_takeaway_desc: "Retrait au restaurant",
    order_delivery: "Livraison",
    order_delivery_desc: "Livr\u00e9e \u00e0 votre adresse",
    order_dinein: "Pr\u00e9-commande Sur Place",
    order_dinein_desc: "Pr\u00eat \u00e0 votre arriv\u00e9e",
    order_delivery_address: "Adresse de Livraison",
    order_delivery_placeholder: "Rue, ville, code postal...",
    order_special: "Demandes Sp\u00e9ciales",
    order_special_placeholder: "Restrictions alimentaires, allergies...",
    order_submit: "Proc\u00e9der au Paiement",
    order_stripe_note: "Vous serez redirig\u00e9 vers Stripe pour un paiement s\u00e9curis\u00e9.",

    osuccess_title: "Commande Confirm\u00e9e !",
    osuccess_sub: "Merci pour votre commande",
    osuccess_thank: "Merci,",
    osuccess_received: "Votre commande a \u00e9t\u00e9 re\u00e7ue et le paiement confirm\u00e9.",
    osuccess_order_num: "Commande #",
    osuccess_restaurant: "Restaurant",
    osuccess_type: "Type de Commande",
    osuccess_delivery_to: "Livrer \u00c0",
    osuccess_items: "Articles Command\u00e9s",
    osuccess_total: "Total Pay\u00e9",
    osuccess_special: "Demandes Sp\u00e9ciales :",
    osuccess_note: "Le restaurant a \u00e9t\u00e9 notifi\u00e9 et commencera \u00e0 pr\u00e9parer votre commande sous peu.",
    osuccess_back: "Retour au Restaurant",
    osuccess_home: "Accueil",

    aboutp_eyebrow: "Notre Histoire",
    aboutp_title: "\u00c0 Propos de Nos Restaurants",
    aboutp_sub: "Deux exp\u00e9riences culinaires portugaises authentiques \u00e0 Set\u00fabal",
    aboutp_lead: "Bienvenue \u2014 berceau de deux \u00e9tablissements portugais bien-aim\u00e9s au c\u0153ur de Set\u00fabal.",
    aboutp_desc: "Voisins sur la historique Rua & Largo Jos\u00e9 Afonso, nos restaurants offrent aux visiteurs l'occasion de d\u00e9couvrir deux facettes distinctes de la cuisine portugaise : la richesse de la c\u00f4te Atlantique et la tradition du grill rustique.",
    aboutp_visit: "Visiter",

    e404_sub: "La page que vous recherchez n'existe pas.",
    e404_back: "Retour \u00e0 l'Accueil",

    footer_desc: "Deux exp\u00e9riences culinaires portugaises authentiques \u00e0 Set\u00fabal. Des fruits de mer frais de la c\u00f4te au picanha grill\u00e9 premium.",
    footer_links: "Liens Rapides",
    footer_reservations: "R\u00e9servations",
    footer_copyright: "Picanha para Familia & Lapicanha \u00b7 Set\u00fabal, Portugal. Tous droits r\u00e9serv\u00e9s.",

    day_monday: "Lundi",
    day_tuesday: "Mardi",
    day_wednesday: "Mercredi",
    day_thursday: "Jeudi",
    day_friday: "Vendredi",
    day_saturday: "Samedi",
    day_sunday: "Dimanche",
    day_closed: "FERM\u00c9",

    r_casa_da_peixe_tagline: "Fruits de mer frais et saveurs c\u00f4ti\u00e8res portugaises",
    r_casa_da_peixe_type: "Fruits de Mer / Cuisine C\u00f4ti\u00e8re Portugaise",
    r_casa_da_peixe_description: "Sp\u00e9cialis\u00e9 dans les fruits de mer les plus frais et la cuisine c\u00f4ti\u00e8re traditionnelle portugaise. Nos plats c\u00e9l\u00e8brent la richesse de la mer avec des recettes authentiques transmises par des g\u00e9n\u00e9rations de p\u00eacheurs et cuisiniers c\u00f4tiers.",
    r_lapicanha_tagline: "Viandes grill\u00e9es premium et saveurs traditionnelles",
    r_lapicanha_sub_tagline: "UN RESTAURANT DE VIANDE",
    r_lapicanha_type: "Grill Premium / Steakhouse / Fusion Portugaise-Br\u00e9silienne",
    r_lapicanha_description: "Viandes grill\u00e9es premium et saveurs traditionnelles portugaises dans une atmosph\u00e8re rustique et chaleureuse. Nous nous sp\u00e9cialisons dans la picanha parfaitement pr\u00e9par\u00e9e et d'autres coupes nobles, accompagn\u00e9es de garnitures portugaises authentiques et de vins.",

    lang_label: "Langue",
  },
};

// ---------------------------------------------------------------
// Translation engine
// ---------------------------------------------------------------

function getLang() {
  return localStorage.getItem('site_lang') || 'en';
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  localStorage.setItem('site_lang', lang);
  applyTranslations(lang);
}

function t(key, lang) {
  lang = lang || getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || '';
}

function applyTranslations(lang) {
  lang = lang || getLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    const val = dict[key] || TRANSLATIONS.en[key];
    if (!val) return;

    // Check if this is an input/textarea placeholder
    if (el.hasAttribute('data-i18n-placeholder')) {
      el.placeholder = val;
      return;
    }

    // Check if it's an option element (preserve value)
    if (el.tagName === 'OPTION') {
      el.textContent = val;
      return;
    }

    // For elements with child elements we want to preserve (like <span class="required">)
    // Only replace the text node content
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = val;
      return;
    }

    // Default: set text content
    el.textContent = val;
  });

  // Update elements with data-i18n-append (text + dynamic suffix, e.g. "Discover Picanha para Familia")
  document.querySelectorAll('[data-i18n-prefix]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-prefix');
    const suffix = el.getAttribute('data-i18n-suffix') || '';
    const val = dict[key] || TRANSLATIONS.en[key] || '';
    el.textContent = val + ' ' + suffix;
  });

  // Update the html lang attribute
  document.documentElement.lang = lang === 'pt' ? 'pt' : lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : 'en';

  // Update the language selector to show current
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = lang;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  var lang = getLang();
  // Set the selector value
  var sel = document.getElementById('langSelect');
  if (sel) {
    sel.value = lang;
    sel.addEventListener('change', function () {
      setLang(this.value);
    });
  }
  // Apply if not English (English is the default in HTML)
  if (lang !== 'en') {
    applyTranslations(lang);
  }
});
