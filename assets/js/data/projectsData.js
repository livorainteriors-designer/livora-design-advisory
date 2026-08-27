/**
 * Livora Interiors - Projects & Work Samples Master Data
 * Real high-resolution renders and walkthrough video links.
 */

export const projectsData = [
  // 1. Living & Lounge Spaces
  {
    id: "liv-01",
    title: "The Serene Hearth Living Lounge",
    category: "living-room",
    categoryLabel: "Living & Lounge",
    featured: true,
    image: "assets/images/1.png",
    gallery: ["assets/images/1.png", "assets/images/1 (2).png", "assets/images/1 (3).png", "assets/images/10.png"],
    year: "2024",
    location: "Residential Residence",
    clientType: "Private Homeowner",
    description: "An open-concept living pavilion showcasing custom travertine accent paneling, warm ambient cove lighting, low-slung bouclé seating, and an integrated fluted media console.",
    highlights: ["Custom Travertine Cladding", "Curated Linen Drapery", "Minimalist Cove Lighting", "Sculptural Coffee Table"]
  },
  {
    id: "liv-02",
    title: "Oatmeal & Walnut Great Room",
    category: "living-room",
    categoryLabel: "Living & Lounge",
    featured: true,
    image: "assets/images/2.png",
    gallery: ["assets/images/2.png", "assets/images/2 (2).png", "assets/images/2 (3).png", "assets/images/3.png"],
    year: "2024",
    location: "Contemporary Apartment",
    clientType: "Freelance Advisory Project",
    description: "Harmonizing rich walnut tones with oatmeal upholstery, ribbed glass partition dividers, and layered ambient sconces for an inviting evening atmosphere.",
    highlights: ["Walnut Slat Wall Accents", "Ribbed Glass Partitions", "Bespoke Sectional", "Warm 2700K Lighting"]
  },
  {
    id: "liv-03",
    title: "Modern Minimalist Salon & Foyer",
    category: "living-room",
    categoryLabel: "Living & Lounge",
    featured: false,
    image: "assets/images/4.png",
    gallery: ["assets/images/4.png", "assets/images/5.png", "assets/images/6.png", "assets/images/7.png"],
    year: "2024",
    location: "Urban Penthouse",
    clientType: "Full Interior Architecture",
    description: "Sculptural archways and plaster wall finishes create a calm, gallery-like entrance transition into the formal lounge.",
    highlights: ["Microcement Floor Coating", "Architectural Niches", "Organic Stone Pedestals"]
  },

  // 2. Master Suites & Bedrooms
  {
    id: "bed-01",
    title: "The Sanctuary Master Suite",
    category: "master-suite",
    categoryLabel: "Master Suites",
    featured: true,
    image: "assets/images/11.png",
    gallery: ["assets/images/11.png", "assets/images/11 (2).png", "assets/images/12.png", "assets/images/14.png"],
    year: "2024",
    location: "Luxury Villa",
    clientType: "Turnkey Design Client",
    description: "A restorative master retreat featuring an oversized upholstered headboard with brass trim, fluted timber acoustic wall panelling, and integrated nightstand illumination.",
    highlights: ["Padded Headboard Wall", "Fluted Timber Siding", "Warm Dimmable Sconces", "Plush Wool Rug"]
  },
  {
    id: "bed-02",
    title: "Earthy Taupe & Linen Bedroom",
    category: "master-suite",
    categoryLabel: "Master Suites",
    featured: true,
    image: "assets/images/17.png",
    gallery: ["assets/images/17.png", "assets/images/18.png", "assets/images/19.png", "assets/images/20.png"],
    year: "2024",
    location: "Private Residence",
    clientType: "Freelance 3D Consultation",
    description: "Embracing tactile linen bedding, soft sage accents, bespoke reading alcove, and seamless floor-to-ceiling drapery for peak tranquility.",
    highlights: ["Custom Reading Alcove", "Framed Botanical Art", "Hidden LED Mood Lighting"]
  },
  {
    id: "bed-03",
    title: "The Minimalist Japandi Bedroom",
    category: "master-suite",
    categoryLabel: "Master Suites",
    featured: false,
    image: "assets/images/21.png",
    gallery: ["assets/images/21.png", "assets/images/22.png", "assets/images/22 (2).png", "assets/images/25.png"],
    year: "2024",
    location: "Modern Duplex",
    clientType: "Design Advisory",
    description: "Low-profile platform bed with integrated floating side tables, rice paper lighting fixtures, and natural white oak surfaces.",
    highlights: ["Low Platform Joinery", "Floating Oak Nightstands", "Wabi-Sabi Plaster"]
  },

  // 3. Kitchen & Dining Pavilions
  {
    id: "kit-01",
    title: "The Architectural Marble Kitchen",
    category: "kitchen-dining",
    categoryLabel: "Kitchen & Dining",
    featured: true,
    image: "assets/images/71.png",
    gallery: ["assets/images/71.png", "assets/images/72.png", "assets/images/75.png", "assets/images/76.png"],
    year: "2024",
    location: "Executive Residence",
    clientType: "Full Interior Consultation",
    description: "Waterfall Calacatta marble island with seamless induction integration, fluted oak bar seating, brass statement pendant lighting, and hidden pantry access.",
    highlights: ["Waterfall Calacatta Counter", "Integrated Appliances", "Fluted Oak Island", "Concealed Butler's Pantry"]
  },
  {
    id: "kit-02",
    title: "Warm Oak & Quartz Dining Gallery",
    category: "kitchen-dining",
    categoryLabel: "Kitchen & Dining",
    featured: false,
    image: "assets/images/92.png",
    gallery: ["assets/images/92.png", "assets/images/93.png", "assets/images/94.png", "assets/images/95.png"],
    year: "2024",
    location: "Villa Residence",
    clientType: "Freelance Advisory",
    description: "A 10-seater natural solid oak dining table flanked by upholstered wishbone chairs, centered under a bespoke bronze linear chandelier.",
    highlights: ["Solid Oak 10-Seater", "Bespoke Bronze Chandelier", "Curated Bar Nook"]
  },

  // 4. Executive Cabins & Commercial Workspaces
  {
    id: "off-01",
    title: "The Director's Executive Cabin",
    category: "office-cabin",
    categoryLabel: "Executive Office & Cabins",
    featured: true,
    image: "assets/images/Enscape_2024-10-07-14-42-13.png",
    gallery: [
      "assets/images/Enscape_2024-10-07-14-42-13.png",
      "assets/images/Enscape_2024-10-07-14-48-33.png",
      "assets/images/Enscape_2024-10-07-14-53-40.png",
      "assets/images/Enscape_2024-10-08-13-43-37.png"
    ],
    video: "assets/videos/my cab.mp4",
    year: "2024",
    location: "Corporate Headquarters",
    clientType: "Commercial Advisory",
    description: "A commanding yet refined executive workspace featuring custom charcoal-stained timber joinery, back-lit book display shelving, acoustic ceiling baffle details, and leather guest armchairs.",
    highlights: ["Executive Desk Joinery", "Backlit Display Bookcase", "Acoustic Slat Walls", "Private Meeting Lounge"]
  },
  {
    id: "off-02",
    title: "Modernist Collaborative Office Suite",
    category: "office-cabin",
    categoryLabel: "Executive Office & Cabins",
    featured: false,
    image: "assets/images/Enscape_2024-10-08-17-05-35.png",
    gallery: [
      "assets/images/Enscape_2024-10-08-17-05-35.png",
      "assets/images/Enscape_2024-10-08-17-08-16.png",
      "assets/images/Enscape_2024-10-08-17-17-50.png",
      "assets/images/Enscape_2024-10-09-17-09-47.png"
    ],
    year: "2024",
    location: "Creative Agency Hub",
    clientType: "Freelance 3D Specialist",
    description: "Designed for high-focus productivity and client hospitality with ergonomic seating, warm indirect perimeter lighting, and architectural greenery planters.",
    highlights: ["Curved Glass Partitions", "Perimeter Architectural LED", "Built-In Credenza"]
  },

  // 5. Wardrobes, Dressing & Vanities
  {
    id: "ward-01",
    title: "Bespoke Glass & Timber Dressing Suite",
    category: "wardrobe-vanity",
    categoryLabel: "Wardrobes & Vanities",
    featured: true,
    image: "assets/images/116.png",
    gallery: ["assets/images/116.png", "assets/images/140.png", "assets/images/149.png", "assets/images/192.png"],
    year: "2024",
    location: "Luxury Penthouse",
    clientType: "Bespoke Interior Client",
    description: "A custom walk-in wardrobe featuring bronze-tinted glass shutter doors, integrated leather-lined accessory drawers, illuminated hanging rails, and a central marble-topped island.",
    highlights: ["Tinted Fluted Glass Shutters", "Leather Accessory Trays", "Integrated Island with Jewel Drawers"]
  },
  {
    id: "ward-02",
    title: "Monolithic Fluted Vanity & Powder Room",
    category: "wardrobe-vanity",
    categoryLabel: "Wardrobes & Vanities",
    featured: false,
    image: "assets/images/207.png",
    gallery: ["assets/images/207.png", "assets/images/260.png", "assets/images/262.png", "assets/images/264.png"],
    year: "2024",
    location: "Boutique Residence",
    clientType: "Freelance Advisory",
    description: "Monolithic stone basin with wall-mounted brushed brass tapware, backlit arched mirror, and warm micro-cement textural wall finishes.",
    highlights: ["Custom Carved Basin", "Wall-Mount Brushed Brass", "Backlit Arch Mirror"]
  },

  // 6. Architectural Enscape Visualizations & 3D Walkthroughs
  {
    id: "arch-01",
    title: "The Solarium Villa Walkthrough",
    category: "architectural-3d",
    categoryLabel: "3D Visualisation & Walkthroughs",
    featured: true,
    image: "assets/images/Enscape_2024-09-24-16-54-37.png",
    gallery: [
      "assets/images/Enscape_2024-09-24-16-54-37.png",
      "assets/images/Enscape_2024-10-03-12-39-09.png",
      "assets/images/Enscape_2024-10-03-13-21-14.png",
      "assets/images/Enscape_2024-10-15-13-51-23.png",
      "assets/images/Enscape_2024-10-16-12-03-16.png"
    ],
    video: "assets/videos/1.mp4",
    secondaryVideo: "assets/videos/2nd.mp4",
    year: "2024",
    location: "Architectural Villa Concept",
    clientType: "Architectural 3D Consultation",
    description: "Comprehensive 4K photorealistic architectural interior simulation with real-time lighting physics, day-to-night lighting transitions, and spatial flow studies.",
    highlights: ["4K Real-Time Photorealism", "Natural Daylight Simulation", "Cinematic Walkthrough Reel"]
  }
];

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "living-room", name: "Living & Lounge" },
  { id: "master-suite", name: "Master Suites" },
  { id: "kitchen-dining", name: "Kitchen & Dining" },
  { id: "office-cabin", name: "Executive Cabins" },
  { id: "wardrobe-vanity", name: "Wardrobes & Vanity" },
  { id: "architectural-3d", name: "3D Walkthroughs" }
];
