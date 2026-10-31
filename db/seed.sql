-- Sample data for local testing. All clients, people and results are fictional.
-- Safe to run repeatedly: existing rows (matched on slug, email or quote) are left untouched.

-- Admin user: admin@insightsconsultancy.com / Admin1234! (bcrypt hash, cost 12)
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
  ('admin@insightsconsultancy.com', '$2b$12$Y7bAfJ6RqzZK61n5hUNkCO9cWaID62nnPV1Z7g1QY0A7vs8POnxWy', 'Site Administrator', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO services (slug, title, short_description, full_description, icon, benefits, display_order) VALUES
  ('demand-planning-forecasting', 'Demand Planning & Forecasting',
   'Statistical and ML-driven forecasts that cut error and keep shelves stocked.',
   'We build forecasting processes that combine statistical models, machine learning and market intelligence. Our team cleans your sales history, segments your portfolio and sets up a monthly demand review so sales, marketing and supply chain work from one agreed number. We account for regional seasonality such as Ramadan, Eid, summer slowdowns and the Dubai Shopping Festival.',
   'line-chart',
   ARRAY['Forecast accuracy improvements of 15–25 points', 'Fewer stock-outs during peak seasons', 'One agreed demand number across teams', 'Faster reaction to promotions and market shifts'],
   1),
  ('inventory-optimisation', 'Inventory Optimisation',
   'Right-size safety stock and free up working capital without hurting service.',
   'We analyse every SKU and location to set the right safety stock, reorder points and order quantities. Using multi-echelon optimisation we balance stock between central warehouses in Jebel Ali or KIZAD and regional stores, releasing cash while protecting service levels for your most important customers.',
   'boxes',
   ARRAY['Inventory reductions of 15–30%', 'Higher service levels on critical items', 'Lower obsolescence and write-offs', 'Clear stocking policies by SKU segment'],
   2),
  ('logistics-distribution', 'Logistics & Distribution',
   'Network design, warehouse layout and transport planning for faster, cheaper delivery.',
   'From network strategy to the warehouse floor, we redesign how goods move across the GCC. We model DC locations, optimise routes and loads, improve warehouse layout and slotting, and help you choose and manage 3PL partners with clear service-level agreements.',
   'truck',
   ARRAY['Transport cost savings of 10–20%', 'Shorter delivery lead times', 'Better use of warehouse space', 'Measurable 3PL performance'],
   3),
  ('procurement-strategy', 'Procurement Strategy',
   'Strategic sourcing and supplier management that lowers total cost of ownership.',
   'We help procurement teams move from transactional buying to strategic sourcing. Our work covers spend analysis, category strategies, supplier segmentation, tendering and negotiation support, plus in-country value (ICV) considerations for UAE and Saudi programmes.',
   'handshake',
   ARRAY['Savings of 5–12% on addressable spend', 'Stronger, more resilient supplier base', 'ICV-aware sourcing strategies', 'Transparent category plans'],
   4),
  ('supply-chain-digital-transformation', 'Supply Chain Digital Transformation',
   'Dashboards, planning tools and automation that make data-driven decisions routine.',
   'We help you choose, implement and adopt the right technology, from Power BI control towers to advanced planning systems and process automation. We start from the decisions your team needs to make, then design the data, tools and training to support them.',
   'cpu',
   ARRAY['Real-time visibility across the chain', 'Less time spent in spreadsheets', 'Vendor-neutral technology selection', 'Higher user adoption'],
   5),
  ('sop-implementation', 'S&OP Implementation',
   'One aligned plan across sales, finance and operations, reviewed every month.',
   'We design and run a monthly Sales & Operations Planning cycle tailored to your business. Demand, supply and financial plans are reconciled in a structured sequence of meetings, ending in an executive review where trade-offs are made with clear data.',
   'users',
   ARRAY['One integrated business plan', 'Faster, better executive decisions', 'Improved plan-to-actual performance', 'Clear ownership and governance'],
   6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO industries (slug, name, description, key_challenges, icon, display_order) VALUES
  ('retail-fmcg', 'Retail & FMCG',
   'Fast-moving consumer goods and multi-channel retailers serving price-sensitive, promotion-driven markets across the GCC.',
   ARRAY['Seasonal peaks around Ramadan, Eid and DSF', 'Promotion-driven demand volatility', 'Short shelf lives and high SKU counts', 'Balancing store and online inventory'],
   'shopping-cart', 1),
  ('healthcare-pharma', 'Healthcare & Pharma',
   'Hospitals, distributors and pharmaceutical companies where availability and compliance are critical.',
   ARRAY['Cold-chain and GDP compliance', 'Strict batch and expiry tracking', 'Long lead times for imported products', 'Zero tolerance for stock-outs of critical items'],
   'heart-pulse', 2),
  ('oil-gas', 'Oil & Gas',
   'Upstream, downstream and service companies managing complex MRO inventories and project logistics.',
   ARRAY['Large, slow-moving spare parts inventories', 'Remote site logistics', 'Long procurement cycles for critical equipment', 'In-country value requirements'],
   'flame', 3),
  ('manufacturing', 'Manufacturing',
   'Industrial and consumer manufacturers in the UAE free zones and KSA industrial cities.',
   ARRAY['Raw material price and supply volatility', 'Capacity planning across lines', 'Linking production plans to demand', 'Working capital tied up in WIP'],
   'factory', 4),
  ('e-commerce', 'E-commerce',
   'Online retailers and marketplaces competing on delivery speed and customer experience.',
   ARRAY['Same-day and next-day delivery expectations', 'High return rates', 'Rapid growth outpacing processes', 'Last-mile cost control'],
   'package', 5),
  ('food-beverage', 'Food & Beverage',
   'Producers, importers and food service distributors in a region that imports most of its food.',
   ARRAY['Food security and import dependence', 'Shelf-life and temperature control', 'Halal and food safety compliance', 'Demand spikes during festivals and tourism season'],
   'utensils', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO case_studies (slug, title, client_name, industry_id, challenge, solution, results, metric_label, metric_value, cover_image_url, published_at, is_featured) VALUES
  ('regional-grocer-stock-outs', 'Cutting stock-outs for a regional grocery chain', 'Al Noor Hypermarkets (fictional)',
   (SELECT id FROM industries WHERE slug = 'retail-fmcg'),
   'A 40-store grocery chain in the UAE and Oman was losing sales to empty shelves during Ramadan, while overstocking slow lines the rest of the year.',
   'We introduced store-level statistical forecasting with Ramadan and Eid event profiles, set new safety stock policies by SKU segment and launched a weekly demand review.',
   'Stock-outs fell by 32% during the following Ramadan season, and overall inventory dropped by 14% within nine months.',
   'Reduction in stock-outs', '32%',
   'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
   now() - interval '20 days', true),
  ('pharma-distributor-cold-chain', 'Securing cold-chain availability for a pharma distributor', 'Gulf MedSupply (fictional)',
   (SELECT id FROM industries WHERE slug = 'healthcare-pharma'),
   'A pharmaceutical distributor serving hospitals across Abu Dhabi had frequent emergency shipments and expiring stock in its cold store.',
   'We redesigned replenishment using FEFO rules, set service targets by product criticality and built a Power BI dashboard tracking expiry risk.',
   'Expired stock write-offs fell by 41% and emergency air shipments dropped from weekly to under one per month.',
   'Lower expiry write-offs', '41%',
   'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
   now() - interval '45 days', true),
  ('oilfield-services-mro', 'Right-sizing MRO spare parts for an oilfield services firm', 'Desert Energy Services (fictional)',
   (SELECT id FROM industries WHERE slug = 'oil-gas'),
   'An oilfield services company held AED 180 million of spare parts across five yards, yet critical parts were still missing when equipment failed.',
   'We classified 22,000 parts by criticality and demand pattern, set new stocking policies and pooled slow movers in a central yard.',
   'Spare parts inventory fell by AED 38 million while critical part availability rose to 97%.',
   'Working capital released', 'AED 38M',
   'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80',
   now() - interval '70 days', true),
  ('manufacturer-sop', 'Launching S&OP for a building materials manufacturer', 'Emirates Build Industries (fictional)',
   (SELECT id FROM industries WHERE slug = 'manufacturing'),
   'Sales and production teams planned separately, causing overtime, missed deliveries and finished goods piling up in the wrong products.',
   'We designed a five-step monthly S&OP cycle, trained process owners and introduced a capacity-constrained production plan.',
   'On-time delivery improved from 78% to 94% and overtime costs fell by 22% in the first two quarters.',
   'On-time delivery', '94%',
   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
   now() - interval '100 days', false),
  ('ecommerce-last-mile', 'Faster, cheaper last-mile delivery for an online retailer', 'ShopSouq Online (fictional)',
   (SELECT id FROM industries WHERE slug = 'e-commerce'),
   'A fast-growing online retailer in Dubai and Riyadh struggled with late deliveries and rising last-mile costs.',
   'We re-zoned delivery areas, introduced dynamic route planning and renegotiated courier contracts with performance-based SLAs.',
   'Cost per delivery fell by 18% and next-day delivery coverage grew from 60% to 85% of orders.',
   'Lower cost per delivery', '18%',
   'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
   now() - interval '130 days', false),
  ('food-importer-forecasting', 'Improving forecast accuracy for a food importer', 'Oasis Foods Trading (fictional)',
   (SELECT id FROM industries WHERE slug = 'food-beverage'),
   'A food importer supplying supermarkets across the GCC relied on spreadsheet forecasts, leading to both shortages and short-dated stock.',
   'We implemented an advanced planning tool, cleaned three years of sales history and built forecasts that account for promotions and seasonality.',
   'Forecast accuracy rose from 45% to 68% and short-dated stock fell by a third.',
   'Forecast accuracy', '68%',
   'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
   now() - interval '160 days', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO insights (slug, title, excerpt, content, category, author_name, read_minutes, cover_image_url, published_at, is_published) VALUES
  ('forecasting-ramadan-demand', 'Forecasting Ramadan demand: what most GCC retailers get wrong',
   'Ramadan moves every year and reshapes demand in ways a standard forecast cannot see. Here is how to plan for it.',
   'Ramadan shifts by around eleven days each year, which means a forecasting model that simply compares this month with the same month last year will be wrong almost by design. Retailers who rely on calendar-month comparisons often see both stock-outs in the first week of the holy month and heavy overstock after Eid.

The fix is to model Ramadan as an event rather than a season. By aligning history to the Ramadan start date, you can build demand profiles for each phase: the pre-Ramadan stock-up, the first and last ten days, and the Eid peak. Each category behaves differently. Dates, juices and dairy surge early, while fashion and gifting peak just before Eid.

Finally, connect the forecast to promotions and store clusters. A hypermarket in a residential area of Sharjah behaves very differently from a convenience store in Dubai Marina. Planning at the right level of detail, and reviewing the plan weekly during the period, is what turns a good forecast into full shelves.',
   'Demand Planning', 'Sara Al Mansoori', 6,
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
   now() - interval '3 days', true),
  ('safety-stock-myths', 'Five safety stock myths that are costing you money',
   'Safety stock is often set by gut feel. These five common myths lead to too much of the wrong stock and too little of the right one.',
   'Most companies we meet still set safety stock as a fixed number of days of cover for every product. It is simple, but it ignores the two things that matter most: how variable demand is and how reliable supply is.

The first myth is that more safety stock always means better service. In reality, service improves quickly at first and then flattens out, so the last few percentage points cost a fortune. The second myth is that all products deserve the same service level. A segmentation by value and variability lets you protect your critical lines while running leaner on the long tail.

Other myths include ignoring supplier lead-time variability, never reviewing parameters, and treating safety stock as a finance problem rather than a planning one. Reviewing policies quarterly, with clear ownership, typically releases 15 to 30 percent of inventory without hurting availability.',
   'Inventory', 'Omar Haddad', 5,
   'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
   now() - interval '10 days', true),
  ('jebel-ali-vs-kizad', 'Choosing a distribution hub: Jebel Ali, KIZAD or both?',
   'The UAE offers world-class logistics hubs. The right choice depends on your customers, products and growth plans.',
   'Jebel Ali has long been the default choice for regional distribution, with unmatched shipping connections and a mature free zone ecosystem. Khalifa Industrial Zone Abu Dhabi (KIZAD) has grown quickly, offering competitive land costs and strong links to Khalifa Port and the Etihad Rail network.

The right answer depends on where your customers are and how you serve them. A business shipping mainly to Saudi Arabia by road may value proximity to the border and rail, while one re-exporting across Africa and South Asia may prioritise sea connections.

We recommend modelling total landed cost and service for several scenarios, including a dual-hub network. Factor in transport, warehousing, duties, lead times and future volumes. The best network is the one that still works when your business has doubled in size.',
   'Logistics', 'Rahul Menon', 7,
   'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
   now() - interval '17 days', true),
  ('icv-procurement', 'In-country value: turning a requirement into a sourcing advantage',
   'ICV programmes in the UAE and Saudi Arabia are reshaping procurement. Smart buyers are using them to build stronger local supply bases.',
   'In-country value (ICV) programmes reward suppliers that invest locally through jobs, manufacturing and local spend. For procurement teams, ICV scores increasingly influence tender outcomes, especially in energy, utilities and government contracts.

Rather than treating ICV as a compliance box, leading companies use it to develop local suppliers. That reduces lead times, lowers exposure to shipping disruption and can cut total cost once local partners scale up.

Start by mapping your spend by category and origin, then identify categories where capable local suppliers exist or could be developed. Build ICV into your category strategies and supplier scorecards so it is measured alongside cost, quality and delivery.',
   'Procurement', 'Fatima Qureshi', 6,
   'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
   now() - interval '24 days', true),
  ('control-tower-power-bi', 'Building a supply chain control tower with tools you already own',
   'You do not need a multi-million dirham platform to get end-to-end visibility. A focused control tower can start with Power BI.',
   'Control towers promise real-time visibility of orders, inventory and shipments across the chain. Many companies assume this requires a large new platform, but a useful first version can often be built with tools already in place.

Begin with the decisions you need to support: which orders are at risk, where inventory is short or excess, and which suppliers are late. Then connect the minimum data needed from your ERP, warehouse system and carriers.

A Power BI control tower refreshed several times a day, with clear exception alerts and owners for each, delivers most of the value at a fraction of the cost. Once the process is working, you can decide whether a specialised platform adds enough to justify the investment.',
   'Technology', 'Daniel Okafor', 8,
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
   now() - interval '31 days', true),
  ('green-logistics-gcc', 'Green logistics in the GCC: practical first steps',
   'Customers and regulators are asking about supply chain emissions. These practical steps cut both carbon and cost.',
   'With the UAE targeting net zero by 2050 and Saudi Arabia by 2060, supply chain emissions are moving up the boardroom agenda. Transport is often the largest source of emissions a distribution business can directly influence.

The good news is that many green measures also save money. Better load planning means fewer trucks on the road. Route optimisation cuts fuel. Consolidating shipments and shifting suitable volumes to rail as the Etihad Rail network expands can reduce both cost and carbon.

Start by measuring a baseline using fuel and shipment data you already have, then set targets for the biggest lanes. Report progress alongside cost and service so sustainability becomes part of everyday logistics management.',
   'Sustainability', 'Layla Hassan', 5,
   'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
   now() - interval '38 days', true),
  ('sop-first-90-days', 'The first 90 days of S&OP: a practical roadmap',
   'S&OP projects fail when they start too big. This 90-day roadmap gets a working process in place quickly.',
   'Sales and Operations Planning is one of the most powerful tools for aligning a business, yet many implementations stall in months of design workshops. The most successful projects get a simple cycle running quickly and improve it month by month.

In the first 30 days, agree the scope, product families and planning horizon, and nominate owners for demand, supply and finance. In days 31 to 60, run the first full cycle using existing data, even if it is imperfect. In days 61 to 90, refine the metrics, formalise the meeting calendar and hold the first executive review.

By the end of the third month, leadership should be making real trade-off decisions in the S&OP meeting. That is the moment the process starts to pay for itself.',
   'Demand Planning', 'Sara Al Mansoori', 7,
   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
   now() - interval '45 days', true),
  ('ai-in-planning', 'Where AI really helps in supply chain planning',
   'AI is everywhere in vendor brochures. Here is where it delivers measurable value today, and where it does not yet.',
   'Artificial intelligence is now part of almost every planning software pitch. In practice, its value is uneven. The clearest wins today are in demand sensing, where machine learning combines recent sales, promotions, weather and events to improve short-term forecasts.

AI also helps with anomaly detection, spotting unusual orders, data errors or supplier delays before they cause problems. Natural language tools are making it easier for planners to query data and explain plans to colleagues.

Where AI struggles is with poor data and unclear processes. A model cannot fix master data errors or a planning process that nobody follows. The best results come from getting the basics right first, then using AI to automate routine work so planners can focus on decisions.',
   'Technology', 'Daniel Okafor', 6,
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
   now() - interval '52 days', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO testimonials (client_name, client_role, company, quote, rating) VALUES
  ('Khalid Rahman', 'Chief Operating Officer', 'Al Noor Hypermarkets (fictional)',
   'Insights Consultancy transformed our planning process. We finally have one number the whole business trusts.', 5),
  ('Priya Nair', 'Supply Chain Director', 'Gulf MedSupply (fictional)',
   'Their inventory work released millions in working capital while our availability actually improved.', 5),
  ('Ahmed Saleh', 'Head of Logistics', 'ShopSouq Online (fictional)',
   'Practical, hands-on and data-driven. They worked side by side with our team until the results were delivered.', 5),
  ('Mariam Al Zaabi', 'Procurement Manager', 'Desert Energy Services (fictional)',
   'The spare parts review paid for itself within months. Our maintenance teams now find what they need first time.', 5),
  ('James Whitfield', 'Managing Director', 'Emirates Build Industries (fictional)',
   'S&OP has changed how our leadership team works. Decisions that used to take weeks now happen in one meeting.', 4),
  ('Noura Al Hashimi', 'Planning Manager', 'Oasis Foods Trading (fictional)',
   'Clear, patient and genuinely expert. Our planners are more confident and our forecasts are far more accurate.', 5)
ON CONFLICT (quote) DO NOTHING;

INSERT INTO job_openings (slug, title, department, location, employment_type, description, requirements, posted_at) VALUES
  ('senior-supply-chain-consultant-dubai', 'Senior Supply Chain Consultant', 'Consulting', 'Dubai, UAE', 'Full-time',
   'Lead client engagements across demand planning, inventory and S&OP. You will manage project workstreams, coach junior consultants and present recommendations to senior client stakeholders.',
   ARRAY['6+ years in supply chain consulting or industry planning roles', 'Strong Excel and data analysis skills; Power BI is a plus', 'Experience with GCC clients', 'Excellent English; Arabic is an advantage'],
   now() - interval '5 days'),
  ('demand-planning-analyst-dubai', 'Demand Planning Analyst', 'Analytics', 'Dubai, UAE', 'Full-time',
   'Build forecasting models and dashboards for client projects. You will clean and analyse sales data, test statistical and machine learning methods and help clients adopt new planning tools.',
   ARRAY['2+ years in demand planning or analytics', 'Python or R for forecasting', 'SQL and Power BI', 'Degree in engineering, statistics or supply chain'],
   now() - interval '12 days'),
  ('procurement-consultant-abu-dhabi', 'Procurement Consultant', 'Consulting', 'Abu Dhabi, UAE', 'Full-time',
   'Support sourcing and category management projects for energy and government clients, including spend analysis, tender support and in-country value strategy.',
   ARRAY['4+ years in procurement or sourcing', 'Knowledge of ICV programmes', 'Strong negotiation and stakeholder skills', 'CIPS qualification is a plus'],
   now() - interval '20 days'),
  ('logistics-network-analyst-contract', 'Logistics Network Analyst (6-month contract)', 'Analytics', 'Abu Dhabi, UAE', 'Contract',
   'Model distribution networks and transport costs for a major client project. You will build scenarios in network design software and present trade-offs to the project team.',
   ARRAY['3+ years in logistics analysis or network design', 'Experience with network optimisation tools', 'Advanced Excel', 'Available to start within one month'],
   now() - interval '8 days')
ON CONFLICT (slug) DO NOTHING;
