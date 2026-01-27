/**
 * Redomy Configuration
 * ====================
 * Home Renovation Project Tracker
 * "Redo My Home"
 */

const APP_CONFIG = {
  // ============================================
  // BASIC APP INFO
  // ============================================
  name: 'Redomy',
  tagline: 'Redo My Home',
  description: 'Track renovation projects, save inspiration, compare contractors, and stay on budget.',
  icon: '🏠',
  version: '1.0.0',
  
  logoHtml: 'Redo<span>my</span>',
  headline: 'Transform Your Space,<br><span class="gradient-text">One Project at a Time.</span>',
  
  ctaHeadline: 'Ready to transform your home?',
  ctaDescription: 'Join homeowners tracking their renovation journey.',

  // ============================================
  // STORAGE KEYS (must be unique per app)
  // ============================================
  storagePrefix: 'redomy',
  
  // ============================================
  // ITEM CONFIGURATION
  // ============================================
  itemName: 'project',
  itemNamePlural: 'projects',
  
  emptyIcon: '🏠',
  emptyTitle: 'No projects yet',
  emptyDescription: 'Start your first renovation project',
  
  newItemButtonText: 'New Project',

  // ============================================
  // LANDING PAGE SECTIONS
  // ============================================
  
  itemsSectionTitle: '🏗️ Popular Projects',
  itemsSectionSubtitle: 'Get inspired by what others are renovating',
  
  heroCards: [
    { icon: '🛁', name: 'Bathroom', subtitle: '2.4K projects', color: '#3b82f6' },
    { icon: '🍳', name: 'Kitchen', subtitle: '3.1K projects', color: '#10b981' },
    { icon: '🛋️', name: 'Living Room', subtitle: '1.8K projects', color: '#f59e0b' }
  ],
  
  features: [
    { icon: '📋', title: 'Plan Projects', description: 'Break down your renovation into manageable tasks' },
    { icon: '💰', title: 'Track Budget', description: 'Stay on top of costs and avoid overspending' },
    { icon: '📸', title: 'Save Inspiration', description: 'Collect ideas and before/after photos' },
    { icon: '⭐', title: 'Rate Contractors', description: 'Keep notes on who did great work' }
  ],

  // ============================================
  // USER STATS (shown on dashboard)
  // ============================================
  stats: [
    { id: 'total', label: 'Total Projects', getValue: (items) => items.length },
    { id: 'active', label: 'In Progress', getValue: (items) => items.filter(i => i.status === 'inprogress').length },
    { id: 'completed', label: 'Completed', getValue: (items) => items.filter(i => i.status === 'completed').length },
    { id: 'budget', label: 'Total Budget', getValue: (items) => {
      const total = items.reduce((sum, i) => sum + (parseInt(i.budget) || 0), 0);
      return '$' + total.toLocaleString();
    }}
  ],

  // ============================================
  // ITEM FIELDS (for create/edit form)
  // ============================================
  itemFields: [
    { 
      id: 'name', 
      label: 'Project Name', 
      type: 'text', 
      placeholder: 'e.g., Master Bathroom Remodel',
      required: true 
    },
    { 
      id: 'description', 
      label: 'Description', 
      type: 'textarea', 
      placeholder: 'What are you planning to do?',
      required: false 
    },
    { 
      id: 'room', 
      label: 'Room/Area', 
      type: 'select',
      options: [
        { value: 'kitchen', label: '🍳 Kitchen' },
        { value: 'bathroom', label: '🛁 Bathroom' },
        { value: 'bedroom', label: '🛏️ Bedroom' },
        { value: 'livingroom', label: '🛋️ Living Room' },
        { value: 'diningroom', label: '🍽️ Dining Room' },
        { value: 'basement', label: '🏚️ Basement' },
        { value: 'garage', label: '🚗 Garage' },
        { value: 'outdoor', label: '🌳 Outdoor/Deck' },
        { value: 'office', label: '💼 Home Office' },
        { value: 'laundry', label: '🧺 Laundry Room' },
        { value: 'whole', label: '🏠 Whole House' },
        { value: 'other', label: '📦 Other' }
      ],
      required: false 
    },
    { 
      id: 'status', 
      label: 'Status', 
      type: 'select',
      options: [
        { value: 'planning', label: '📝 Planning' },
        { value: 'budgeting', label: '💵 Budgeting' },
        { value: 'hiring', label: '👷 Hiring Contractors' },
        { value: 'inprogress', label: '🔨 In Progress' },
        { value: 'onhold', label: '⏸️ On Hold' },
        { value: 'completed', label: '✅ Completed' }
      ],
      required: false 
    },
    { 
      id: 'budget', 
      label: 'Budget ($)', 
      type: 'text', 
      placeholder: 'e.g., 5000',
      required: false 
    },
    { 
      id: 'contractor', 
      label: 'Contractor/DIY', 
      type: 'select',
      options: [
        { value: 'diy', label: '🔧 DIY' },
        { value: 'contractor', label: '👷 Hired Contractor' },
        { value: 'mixed', label: '🤝 Mix of Both' },
        { value: 'undecided', label: '❓ Undecided' }
      ],
      required: false 
    },
    {
      id: 'icon',
      label: 'Icon',
      type: 'iconPicker',
      options: ['🏠', '🛁', '🍳', '🛋️', '🛏️', '🚗', '🌳', '💼', '🔨', '🎨', '💡', '🧺'],
      default: '🏠'
    },
    {
      id: 'color',
      label: 'Color',
      type: 'colorPicker',
      options: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'],
      default: '#3b82f6'
    }
  ],

  // ============================================
  // DISCOVER SECTION (sample/featured items)
  // ============================================
  discoverItems: [
    { 
      name: 'Modern Kitchen Makeover', 
      icon: '🍳', 
      color: '#10b981', 
      description: 'White cabinets, quartz counters, subway tile backsplash',
      stats: { views: 3200, likes: 156 }
    },
    { 
      name: 'Spa-Like Bathroom', 
      icon: '🛁', 
      color: '#3b82f6', 
      description: 'Walk-in shower, heated floors, double vanity',
      stats: { views: 2800, likes: 132 }
    },
    { 
      name: 'Basement Home Theater', 
      icon: '🎬', 
      color: '#8b5cf6', 
      description: '120" screen, surround sound, theater seating',
      stats: { views: 1900, likes: 98 }
    },
    { 
      name: 'Outdoor Living Space', 
      icon: '🌳', 
      color: '#84cc16', 
      description: 'Covered patio, outdoor kitchen, fire pit',
      stats: { views: 2100, likes: 89 }
    },
    { 
      name: 'Garage Workshop', 
      icon: '🔧', 
      color: '#f59e0b', 
      description: 'Workbench, tool storage, epoxy floors',
      stats: { views: 1500, likes: 67 }
    },
    { 
      name: 'Smart Home Office', 
      icon: '💼', 
      color: '#06b6d4', 
      description: 'Built-in desk, soundproofing, video backdrop',
      stats: { views: 1800, likes: 74 }
    }
  ],

  // ============================================
  // DEFAULT USERS
  // NOTE: These credentials are visible in source code.
  // For static sites, this is unavoidable - "auth" is UX, not security.
  // Real security would require a backend server.
  // ============================================
  defaultAdmin: {
    username: 'admin',
    password: 'admin',  // Visible in source - demo site only
    displayName: 'Administrator',
    email: 'admin@redomy.com',
    isAdmin: true
  },
  
  defaultDemo: {
    username: 'demo',
    password: 'demo',  // Intentionally simple - PUBLIC demo account
    displayName: 'Demo User',
    email: 'demo@redomy.com',
    isAdmin: false
  },

  // ============================================
  // DEMO CONTENT
  // ============================================
  demoItems: [
    {
      name: 'Kitchen Renovation',
      description: 'Complete gut renovation - new cabinets, countertops, appliances, and flooring. Going with white shaker cabinets and quartz counters.',
      icon: '🍳',
      color: '#10b981',
      room: 'kitchen',
      status: 'inprogress',
      budget: '25000',
      contractor: 'contractor'
    },
    {
      name: 'Master Bath Update',
      description: 'Replace tub with walk-in shower, new vanity, update fixtures. Keeping layout the same to save on plumbing.',
      icon: '🛁',
      color: '#3b82f6',
      room: 'bathroom',
      status: 'planning',
      budget: '12000',
      contractor: 'contractor'
    },
    {
      name: 'Basement Finishing',
      description: 'Add drywall, flooring, and create a rec room with small bar area. Egress window already installed.',
      icon: '🏚️',
      color: '#8b5cf6',
      room: 'basement',
      status: 'budgeting',
      budget: '35000',
      contractor: 'mixed'
    },
    {
      name: 'Deck Replacement',
      description: 'Replace old wood deck with composite decking. Same footprint, adding built-in benches.',
      icon: '🌳',
      color: '#84cc16',
      room: 'outdoor',
      status: 'completed',
      budget: '8000',
      contractor: 'diy'
    },
    {
      name: 'Home Office Built-ins',
      description: 'Custom bookshelves and desk nook. Paint and new lighting.',
      icon: '💼',
      color: '#06b6d4',
      room: 'office',
      status: 'completed',
      budget: '3500',
      contractor: 'diy'
    }
  ],

  // ============================================
  // THEME COLORS
  // ============================================
  theme: {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    gradient1: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    gradient2: 'linear-gradient(135deg, #10b981, #059669)'
  },

  // ============================================
  // CUSTOM FUNCTIONS
  // ============================================
  renderItemCard: null,
  renderItemDetail: null,
  validateItem: null,
  onItemCreated: null,
  onItemDeleted: null,

  // ============================================
  // CHANGELOG (shown in admin panel)
  // ============================================
  changelog: [
    {
      version: 'v1.0.0',
      date: 'January 2026',
      changes: [
        'Initial release',
        'Project tracking by room',
        'Budget tracking with totals',
        'Status workflow (planning → completed)',
        'Contractor vs DIY tracking',
        'Admin panel with changelog',
        'Terms of Service and Privacy Policy'
      ]
    }
  ]
};

window.APP_CONFIG = APP_CONFIG;
