/**
 * Redomy - Redo My Home
 * Main App JS with Task List, 3D Premium Preview on Landing Page
 */

const App = {
  state: { currentItem: null, editingItemId: null },

  init() {
    this.applyConfig();
    this.bindEvents();
    this.loadLandingContent();
    this.checkAuth();
  },

  applyConfig() {
    document.title = `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`;
    document.querySelectorAll('.logo').forEach(el => el.innerHTML = APP_CONFIG.logoHtml);
    document.querySelectorAll('.hero-slogan, .auth-tagline, .footer-slogan').forEach(el => el.textContent = APP_CONFIG.tagline);
    const heroContent = document.querySelector('.hero-content h1');
    if (heroContent) heroContent.innerHTML = APP_CONFIG.headline;
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = APP_CONFIG.description;
    const ctaHeadline = document.querySelector('.landing-cta h2');
    if (ctaHeadline) ctaHeadline.textContent = APP_CONFIG.ctaHeadline;
    const ctaDesc = document.querySelector('.landing-cta p');
    if (ctaDesc) ctaDesc.textContent = APP_CONFIG.ctaDescription;
    const itemsTitle = document.getElementById('items-section-title');
    if (itemsTitle) itemsTitle.textContent = APP_CONFIG.itemsSectionTitle;
    const itemsSubtitle = document.getElementById('items-section-subtitle');
    if (itemsSubtitle) itemsSubtitle.textContent = APP_CONFIG.itemsSectionSubtitle;
    const myItemsTitle = document.getElementById('my-items-title');
    if (myItemsTitle) myItemsTitle.textContent = `My ${APP_CONFIG.itemNamePlural.charAt(0).toUpperCase() + APP_CONFIG.itemNamePlural.slice(1)}`;
    const myItemsSubtitle = document.getElementById('my-items-subtitle');
    if (myItemsSubtitle) myItemsSubtitle.textContent = `Manage your ${APP_CONFIG.itemNamePlural}`;
    const newItemBtnText = document.getElementById('new-item-btn-text');
    if (newItemBtnText) newItemBtnText.textContent = APP_CONFIG.newItemButtonText;
    const emptyIcon = document.getElementById('empty-icon');
    if (emptyIcon) emptyIcon.textContent = APP_CONFIG.emptyIcon;
    const emptyTitle = document.getElementById('empty-title');
    if (emptyTitle) emptyTitle.textContent = APP_CONFIG.emptyTitle;
    const emptyDesc = document.getElementById('empty-description');
    if (emptyDesc) emptyDesc.textContent = APP_CONFIG.emptyDescription;
    const emptyBtnText = document.getElementById('empty-new-item-btn-text');
    if (emptyBtnText) emptyBtnText.textContent = `Create First ${APP_CONFIG.itemName.charAt(0).toUpperCase() + APP_CONFIG.itemName.slice(1)}`;
  },

  checkAuth() { if (Auth.isLoggedIn()) this.showDashboard(); else this.showLandingPage(); },

  bindEvents() {
    document.getElementById('landing-login-btn')?.addEventListener('click', () => this.showAuthScreen());
    document.getElementById('landing-start-btn')?.addEventListener('click', () => this.showAuthScreen('signup'));
    document.getElementById('landing-start-btn-2')?.addEventListener('click', () => this.showAuthScreen('signup'));
    document.getElementById('landing-demo-btn')?.addEventListener('click', () => this.loginAsDemo());
    document.getElementById('landing-premium-btn')?.addEventListener('click', () => { this.showToast('You\'re on the waitlist! 🎉', 'success'); this.showAuthScreen('signup'); });
    document.getElementById('auth-demo-btn')?.addEventListener('click', () => this.loginAsDemo());
    document.querySelectorAll('.auth-tab').forEach(tab => tab.addEventListener('click', (e) => this.switchAuthTab(e.target.dataset.tab)));
    document.getElementById('back-to-landing')?.addEventListener('click', (e) => { e.preventDefault(); this.showLandingPage(); });
    document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('signup-form')?.addEventListener('submit', (e) => this.handleSignup(e));
    document.getElementById('reset-app-link')?.addEventListener('click', (e) => this.resetAppToDefaults(e));
    document.querySelector('.user-menu')?.addEventListener('click', (e) => { e.stopPropagation(); this.toggleUserMenu(); });
    document.getElementById('logout-link')?.addEventListener('click', (e) => this.handleLogout(e));
    document.getElementById('settings-link')?.addEventListener('click', (e) => this.openSettings(e));
    document.querySelectorAll('.nav-tab[data-view]').forEach(tab => tab.addEventListener('click', (e) => this.switchDashboardView(e.target.dataset.view)));
    document.getElementById('new-item-btn')?.addEventListener('click', () => this.openCreateModal());
    document.getElementById('empty-new-item-btn')?.addEventListener('click', () => this.openCreateModal());
    document.getElementById('close-create-modal')?.addEventListener('click', () => this.closeCreateModal());
    document.getElementById('create-form')?.addEventListener('submit', (e) => this.handleCreateSubmit(e));
    document.getElementById('close-item-modal')?.addEventListener('click', () => this.closeItemModal());
    document.getElementById('close-settings-modal')?.addEventListener('click', () => this.closeSettingsModal());
    document.getElementById('cancel-settings')?.addEventListener('click', () => this.closeSettingsModal());
    document.getElementById('user-settings-form')?.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
    document.getElementById('backup-data-btn')?.addEventListener('click', () => this.backupUserData());
    document.getElementById('restore-data-input')?.addEventListener('change', (e) => this.restoreUserData(e));
    document.getElementById('view-cache-btn')?.addEventListener('click', () => this.openCacheViewer());
    document.getElementById('close-cache-modal')?.addEventListener('click', () => this.closeCacheModal());
    document.querySelectorAll('.cache-tab').forEach(tab => tab.addEventListener('click', (e) => this.switchCacheTab(e.target.dataset.cacheTab)));
    document.getElementById('clear-my-cache-btn')?.addEventListener('click', () => this.clearMyCache());
    document.addEventListener('click', (e) => { if (!e.target.closest('.user-menu')) document.getElementById('user-dropdown')?.classList.remove('active'); });
    document.getElementById('admin-link')?.addEventListener('click', (e) => this.openAdminPanel(e));
    document.getElementById('close-admin-modal')?.addEventListener('click', () => this.closeAdminModal());
    document.querySelectorAll('.admin-tab').forEach(tab => tab.addEventListener('click', (e) => this.switchAdminTab(e.target.dataset.adminTab)));
    document.getElementById('admin-export-btn')?.addEventListener('click', () => this.exportAllData());
    document.getElementById('admin-reset-btn')?.addEventListener('click', () => this.resetAllData());
    document.getElementById('footer-terms-link')?.addEventListener('click', (e) => this.showLegal(e, 'terms'));
    document.getElementById('footer-privacy-link')?.addEventListener('click', (e) => this.showLegal(e, 'privacy'));
    document.getElementById('settings-terms-link')?.addEventListener('click', (e) => this.showLegal(e, 'terms'));
    document.getElementById('settings-privacy-link')?.addEventListener('click', (e) => this.showLegal(e, 'privacy'));
    document.getElementById('signup-terms-link')?.addEventListener('click', (e) => this.showLegal(e, 'terms'));
    document.getElementById('signup-privacy-link')?.addEventListener('click', (e) => this.showLegal(e, 'privacy'));
    document.getElementById('auth-terms-link')?.addEventListener('click', (e) => this.showLegal(e, 'terms'));
    document.getElementById('close-legal-modal')?.addEventListener('click', () => this.closeLegalModal());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { this.closeCreateModal(); this.closeItemModal(); this.closeSettingsModal(); this.closeCacheModal(); this.closeAdminModal(); this.closeLegalModal(); }});
    document.getElementById('create-modal')?.addEventListener('click', (e) => { if (e.target.id === 'create-modal') this.closeCreateModal(); });
    document.getElementById('item-modal')?.addEventListener('click', (e) => { if (e.target.id === 'item-modal') this.closeItemModal(); });
    document.getElementById('settings-modal')?.addEventListener('click', (e) => { if (e.target.id === 'settings-modal') this.closeSettingsModal(); });
    document.getElementById('cache-modal')?.addEventListener('click', (e) => { if (e.target.id === 'cache-modal') this.closeCacheModal(); });
    document.getElementById('admin-modal')?.addEventListener('click', (e) => { if (e.target.id === 'admin-modal') this.closeAdminModal(); });
    document.getElementById('legal-modal')?.addEventListener('click', (e) => { if (e.target.id === 'legal-modal') this.closeLegalModal(); });
  },

  showScreen(screenId) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(screenId)?.classList.add('active'); },
  showLandingPage() { this.showScreen('landing-screen'); },
  
  loadLandingContent() {
    const heroCardsEl = document.getElementById('hero-cards');
    if (heroCardsEl && APP_CONFIG.heroCards) {
      heroCardsEl.innerHTML = APP_CONFIG.heroCards.map((card, i) => `<div class="hero-card" style="background: linear-gradient(135deg, ${card.color}, ${this.adjustColor(card.color, -30)}); transform: rotate(${(i-1) * 6}deg) translateY(${i * 10}px);"><span class="hero-card-icon">${card.icon}</span><span class="hero-card-name">${card.name}</span><span class="hero-card-subs">${card.subtitle}</span></div>`).join('');
    }
    const featuresGrid = document.getElementById('features-grid');
    if (featuresGrid && APP_CONFIG.features) featuresGrid.innerHTML = APP_CONFIG.features.map(f => `<div class="feature-card"><div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.description}</p></div>`).join('');
    const itemsGrid = document.getElementById('landing-items-grid');
    if (itemsGrid && APP_CONFIG.demoItems) itemsGrid.innerHTML = APP_CONFIG.demoItems.slice(0, 3).map(item => `<div class="item-card"><div class="item-card-header" style="background: linear-gradient(135deg, ${item.color}, ${this.adjustColor(item.color, -30)});">${item.icon}</div><div class="item-card-body"><h3 class="item-card-title">${this.escapeHtml(item.name)}</h3><p class="item-card-desc">${this.escapeHtml(item.description || '')}</p></div></div>`).join('');
  },

  showAuthScreen(tab = 'login') { this.showScreen('auth-screen'); this.switchAuthTab(tab); },
  showDashboard() { this.showScreen('dashboard-screen'); this.updateUserInfo(); this.loadItems(); this.loadDiscoverItems(); this.updateStats(); },

  // AUTH
  switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tab}"]`)?.classList.add('active');
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`${tab}-form`)?.classList.add('active');
    document.getElementById('login-error').textContent = '';
    document.getElementById('signup-error').textContent = '';
  },

  handleLogin(e) {
    e.preventDefault();
    try { Auth.login(document.getElementById('login-username').value.trim(), document.getElementById('login-password').value); this.showToast('Welcome back!', 'success'); this.showDashboard(); }
    catch (error) { document.getElementById('login-error').textContent = error.message; }
  },

  handleSignup(e) {
    e.preventDefault();
    const terms = document.getElementById('signup-terms')?.checked;
    if (!terms) { document.getElementById('signup-error').textContent = 'You must agree to the Terms of Service and Privacy Policy'; return; }
    if (document.getElementById('signup-password').value !== document.getElementById('signup-confirm').value) { document.getElementById('signup-error').textContent = 'Passwords do not match'; return; }
    try { Auth.signup(document.getElementById('signup-name').value.trim(), document.getElementById('signup-username').value.trim(), document.getElementById('signup-email').value.trim(), document.getElementById('signup-password').value); this.showToast(`Welcome to ${APP_CONFIG.name}!`, 'success'); this.showDashboard(); }
    catch (error) { document.getElementById('signup-error').textContent = error.message; }
  },

  handleLogout(e) { e.preventDefault(); Auth.logout(); this.showToast('Logged out', 'success'); this.showAuthScreen(); document.getElementById('login-form').reset(); document.getElementById('signup-form').reset(); },
  
  loginAsDemo() {
    try { Auth.login('demo', 'demo123'); } catch { Storage.clearAll(); Auth.login('demo', 'demo123'); }
    this.showToast('Welcome to the demo!', 'success'); this.showDashboard();
  },

  resetAppToDefaults(e) {
    e.preventDefault();
    if (prompt('Admin password:') !== APP_CONFIG.defaultAdmin.password) { this.showToast('Incorrect password', 'error'); return; }
    if (!confirm('Reset all data?')) return;
    Storage.clearAll(); this.showToast('App reset!', 'success'); document.getElementById('login-form').reset();
  },

  toggleUserMenu() { document.getElementById('user-dropdown')?.classList.toggle('active'); },
  
  updateUserInfo() {
    const user = Auth.getCurrentUser();
    if (user) {
      document.getElementById('user-display-name').textContent = user.displayName;
      document.getElementById('user-avatar').textContent = user.displayName.charAt(0).toUpperCase();
      const adminLink = document.getElementById('admin-link');
      if (adminLink) adminLink.style.display = user.isAdmin ? 'block' : 'none';
    }
  },

  switchDashboardView(view) {
    document.querySelectorAll('.nav-tab[data-view]').forEach(t => t.classList.remove('active'));
    document.querySelector(`.nav-tab[data-view="${view}"]`)?.classList.add('active');
    document.querySelectorAll('.dashboard-view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`)?.classList.add('active');
  },

  loadItems() {
    const user = Auth.getCurrentUser(); if (!user) return;
    const items = Storage.getUserItems(user.id);
    const grid = document.getElementById('items-grid');
    const emptyState = document.getElementById('empty-items');
    if (items.length === 0) { grid.innerHTML = ''; emptyState?.classList.add('active'); return; }
    emptyState?.classList.remove('active');
    grid.innerHTML = items.map(item => this.renderDefaultItemCard(item)).join('');
  },

  renderDefaultItemCard(item) {
    const isFav = Storage.isFavorite(Auth.getCurrentUser()?.id, item.id);
    const taskCount = item.tasks ? item.tasks.length : 0;
    const tasksDone = item.tasks ? item.tasks.filter(t => t.completed).length : 0;
    return `<div class="item-card" data-id="${item.id}"><div class="item-card-header" style="background: linear-gradient(135deg, ${item.color || '#3b82f6'}, ${this.adjustColor(item.color || '#3b82f6', -30)});">${item.icon || '🏠'}<button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); App.toggleFavorite('${item.id}')">${isFav ? '⭐' : '☆'}</button></div><div class="item-card-body"><h3 class="item-card-title">${this.escapeHtml(item.name)}</h3><p class="item-card-desc">${this.escapeHtml(item.description || '')}</p><div class="item-card-stats"><span>${item.status || 'planning'}</span>${taskCount > 0 ? `<span>✅ ${tasksDone}/${taskCount}</span>` : ''}</div><div class="item-card-actions"><button class="item-action-view" onclick="App.openItemModal('${item.id}')">👁️ View</button><button class="item-action-edit" onclick="App.openCreateModal('${item.id}')">✏️ Edit</button><button class="item-action-delete" onclick="App.deleteItem('${item.id}')">🗑️</button></div></div></div>`;
  },

  loadDiscoverItems() {
    const grid = document.getElementById('discover-grid'); if (!grid || !APP_CONFIG.discoverItems) return;
    grid.innerHTML = APP_CONFIG.discoverItems.map(item => `<div class="item-card"><div class="item-card-header" style="background: linear-gradient(135deg, ${item.color}, ${this.adjustColor(item.color, -30)});">${item.icon}</div><div class="item-card-body"><h3 class="item-card-title">${item.name}</h3><p class="item-card-desc">${item.description}</p>${item.stats ? `<div class="item-card-stats"><span>👀 ${(item.stats.views/1000).toFixed(1)}k</span><span>❤️ ${item.stats.likes}</span></div>` : ''}</div></div>`).join('');
  },

  updateStats() {
    const user = Auth.getCurrentUser(); if (!user) return;
    const items = Storage.getUserItems(user.id);
    const statsRow = document.getElementById('user-stats');
    if (statsRow && APP_CONFIG.stats) statsRow.innerHTML = APP_CONFIG.stats.map(stat => `<div class="stat-card"><div class="stat-label">${stat.label}</div><div class="stat-value">${stat.getValue(items, user)}</div></div>`).join('');
  },

  toggleFavorite(itemId) { const user = Auth.getCurrentUser(); if (!user) return; Storage.toggleFavorite(user.id, itemId); this.loadItems(); },

  // CREATE/EDIT MODAL
  openCreateModal(itemId = null) {
    this.state.editingItemId = itemId;
    const form = document.getElementById('create-form');
    form.innerHTML = this.buildFormFields(itemId);
    document.getElementById('create-modal-title').textContent = itemId ? `Edit ${APP_CONFIG.itemName}` : `New ${APP_CONFIG.itemName}`;
    if (itemId) this.populateFormFields(Storage.getItem(itemId));
    document.getElementById('create-modal').classList.add('active');
  },

  buildFormFields(editingId) {
    let html = '';
    APP_CONFIG.itemFields.forEach(f => {
      if (f.type === 'text') html += `<div class="form-group"><label>${f.label}</label><input type="text" id="field-${f.id}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}></div>`;
      else if (f.type === 'textarea') html += `<div class="form-group"><label>${f.label}</label><textarea id="field-${f.id}" placeholder="${f.placeholder || ''}" rows="3"></textarea></div>`;
      else if (f.type === 'select') html += `<div class="form-group"><label>${f.label}</label><select id="field-${f.id}">${f.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select></div>`;
      else if (f.type === 'iconPicker') html += `<div class="form-group"><label>${f.label}</label><div class="icon-picker">${f.options.map(i => `<button type="button" class="icon-btn ${i === f.default ? 'selected' : ''}" data-icon="${i}" onclick="App.selectIcon('${f.id}','${i}')">${i}</button>`).join('')}</div><input type="hidden" id="field-${f.id}" value="${f.default}"></div>`;
      else if (f.type === 'colorPicker') html += `<div class="form-group"><label>${f.label}</label><div class="color-picker">${f.options.map(c => `<button type="button" class="color-btn ${c === f.default ? 'selected' : ''}" data-color="${c}" style="background:linear-gradient(135deg,${c},${this.adjustColor(c,-30)})" onclick="App.selectColor('${f.id}','${c}')"></button>`).join('')}</div><input type="hidden" id="field-${f.id}" value="${f.default}"></div>`;
    });
    return html + `<div class="form-actions"><button type="button" class="btn-secondary" onclick="App.closeCreateModal()">Cancel</button><button type="submit" class="btn-primary">${editingId ? 'Save' : 'Create'}</button></div>`;
  },

  populateFormFields(item) {
    APP_CONFIG.itemFields.forEach(f => {
      const el = document.getElementById(`field-${f.id}`);
      if (el && item[f.id] !== undefined) {
        el.value = item[f.id];
        if (f.type === 'iconPicker') document.querySelectorAll('.icon-picker .icon-btn').forEach(btn => btn.classList.toggle('selected', btn.dataset.icon === item[f.id]));
        if (f.type === 'colorPicker') document.querySelectorAll('.color-picker .color-btn').forEach(btn => btn.classList.toggle('selected', btn.dataset.color === item[f.id]));
      }
    });
  },

  selectIcon(fid, icon) { document.querySelectorAll('.icon-picker .icon-btn').forEach(b => b.classList.toggle('selected', b.dataset.icon === icon)); document.getElementById(`field-${fid}`).value = icon; },
  selectColor(fid, color) { document.querySelectorAll('.color-picker .color-btn').forEach(b => b.classList.toggle('selected', b.dataset.color === color)); document.getElementById(`field-${fid}`).value = color; },
  closeCreateModal() { document.getElementById('create-modal')?.classList.remove('active'); this.state.editingItemId = null; },

  handleCreateSubmit(e) {
    e.preventDefault();
    const user = Auth.getCurrentUser(); if (!user) return;
    const data = { userId: user.id };
    APP_CONFIG.itemFields.forEach(f => { const el = document.getElementById(`field-${f.id}`); if (el) data[f.id] = el.value; });
    if (this.state.editingItemId) { Storage.updateItem(this.state.editingItemId, data); this.showToast('Updated!', 'success'); }
    else { Storage.createItem(data); this.showToast('Created!', 'success'); }
    this.closeCreateModal(); this.loadItems(); this.updateStats();
  },

  deleteItem(itemId) { if (!confirm('Delete?')) return; Storage.deleteItem(itemId); this.showToast('Deleted', 'success'); this.loadItems(); this.updateStats(); },

  // ITEM DETAIL MODAL WITH TASKS
  openItemModal(itemId) {
    const item = Storage.getItem(itemId); if (!item) return;
    this.state.currentItem = item;
    if (!item.tasks) item.tasks = [];
    document.getElementById('item-modal-title').textContent = item.name;
    document.getElementById('item-modal-body').innerHTML = `
      <div class="item-detail">
        <div class="item-detail-header" style="background: linear-gradient(135deg, ${item.color || '#3b82f6'}, ${this.adjustColor(item.color || '#3b82f6', -30)});"><span class="item-detail-icon">${item.icon || '🏠'}</span></div>
        <div class="detail-tabs">
          <button class="detail-tab active" data-detail-tab="info">📋 Details</button>
          <button class="detail-tab" data-detail-tab="tasks">✅ Tasks</button>
          <button class="detail-tab" data-detail-tab="3d">🎨 3D View</button>
        </div>
        <div id="detail-info-tab" class="detail-tab-content active">
          <div class="item-detail-body">
            <h2>${this.escapeHtml(item.name)}</h2>
            <p>${this.escapeHtml(item.description || 'No description')}</p>
            <div class="item-detail-meta"><span>Room: ${item.room || 'Not set'}</span><span>Status: ${item.status || 'Not set'}</span><span>Budget: ${item.budget ? '$' + parseInt(item.budget).toLocaleString() : 'Not set'}</span></div>
            <div class="item-detail-meta" style="margin-top:0.5rem"><span>Created: ${this.formatDate(item.createdAt)}</span><span>Updated: ${this.formatDate(item.updatedAt)}</span></div>
          </div>
        </div>
        <div id="detail-tasks-tab" class="detail-tab-content">
          <div class="task-section">
            <div class="task-header"><h4>📋 Project Tasks</h4></div>
            <div class="task-list" id="task-list">${this.renderTasks(item.tasks)}</div>
            ${this.renderTaskProgress(item.tasks)}
            <div class="add-task-form"><input type="text" id="new-task-name" placeholder="Add a task..."><input type="date" id="new-task-due"><button type="button" class="add-task-btn" onclick="App.addTask()">+ Add</button></div>
          </div>
        </div>
        <div id="detail-3d-tab" class="detail-tab-content">
          <div class="premium-feature"><div class="premium-preview">
            <div class="premium-3d-mockup"><div class="room-3d"><div class="room-wall-back"></div><div class="room-floor"></div><div class="room-furniture"></div><div class="room-furniture-2"></div><div class="room-window"></div></div></div>
            <div class="premium-overlay">
              <span class="premium-badge">⭐ PREMIUM</span>
              <h3 class="premium-title">3D Room Visualization</h3>
              <p class="premium-description">Upload a photo of your room and our AI creates an interactive 3D model</p>
              <ul class="premium-features-list"><li>AI-powered room scanning</li><li>Drag & drop furniture</li><li>Shop items from Amazon</li><li>Before/after comparison</li><li>Share with contractors</li></ul>
              <button class="upgrade-btn" onclick="App.showUpgradeModal()">🚀 Upgrade to Premium</button>
              <p class="premium-note">Starting at $9.99/month</p>
            </div>
          </div></div>
        </div>
      </div>`;
    document.getElementById('item-modal-body').querySelectorAll('.detail-tab').forEach(tab => tab.addEventListener('click', (e) => this.switchDetailTab(e.target.dataset.detailTab)));
    document.getElementById('item-modal').classList.add('active');
  },

  switchDetailTab(tab) {
    document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.detail-tab[data-detail-tab="${tab}"]`)?.classList.add('active');
    document.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`detail-${tab}-tab`)?.classList.add('active');
  },

  renderTasks(tasks) {
    if (!tasks || tasks.length === 0) return `<div class="empty-tasks"><div class="empty-tasks-icon">📝</div><p>No tasks yet. Add your first task below!</p></div>`;
    return tasks.map((t, i) => `<div class="task-item ${t.completed ? 'completed' : ''}"><input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''} onchange="App.toggleTask(${i})"><div class="task-info"><div class="task-name">${this.escapeHtml(t.name)}</div>${t.dueDate ? `<div class="task-due ${this.getTaskDueClass(t.dueDate)}">${this.formatTaskDue(t.dueDate)}</div>` : ''}</div><button class="task-delete" onclick="App.deleteTask(${i})">×</button></div>`).join('');
  },

  renderTaskProgress(tasks) {
    if (!tasks || tasks.length === 0) return '';
    const done = tasks.filter(t => t.completed).length, total = tasks.length, pct = Math.round((done/total)*100);
    return `<div class="task-progress"><div class="task-progress-bar"><div class="task-progress-fill" style="width:${pct}%"></div></div><div class="task-progress-text">${done} of ${total} complete (${pct}%)</div></div>`;
  },

  getTaskDueClass(d) { const diff = Math.ceil((new Date(d) - new Date().setHours(0,0,0,0)) / 86400000); return diff < 0 ? 'overdue' : diff <= 3 ? 'soon' : ''; },
  formatTaskDue(d) { const diff = Math.ceil((new Date(d) - new Date().setHours(0,0,0,0)) / 86400000); if (diff < 0) return `⚠️ Overdue`; if (diff === 0) return '📅 Today'; if (diff === 1) return '📅 Tomorrow'; if (diff <= 7) return `📅 ${diff} days`; return `📅 ${this.formatDate(d)}`; },

  addTask() {
    const name = document.getElementById('new-task-name').value.trim(); if (!name) return;
    const item = this.state.currentItem;
    if (!item.tasks) item.tasks = [];
    item.tasks.push({ name, dueDate: document.getElementById('new-task-due').value || null, completed: false });
    Storage.updateItem(item.id, { tasks: item.tasks });
    document.getElementById('task-list').innerHTML = this.renderTasks(item.tasks);
    const p = document.querySelector('.task-progress'); if (p) p.outerHTML = this.renderTaskProgress(item.tasks); else document.getElementById('task-list').insertAdjacentHTML('afterend', this.renderTaskProgress(item.tasks));
    document.getElementById('new-task-name').value = ''; document.getElementById('new-task-due').value = '';
    this.showToast('Task added!', 'success'); this.loadItems();
  },

  toggleTask(i) {
    const item = this.state.currentItem; if (!item.tasks?.[i]) return;
    item.tasks[i].completed = !item.tasks[i].completed;
    Storage.updateItem(item.id, { tasks: item.tasks });
    document.getElementById('task-list').innerHTML = this.renderTasks(item.tasks);
    const p = document.querySelector('.task-progress'); if (p) p.outerHTML = this.renderTaskProgress(item.tasks);
    this.loadItems();
  },

  deleteTask(i) {
    const item = this.state.currentItem; if (!item.tasks) return;
    item.tasks.splice(i, 1);
    Storage.updateItem(item.id, { tasks: item.tasks });
    document.getElementById('task-list').innerHTML = this.renderTasks(item.tasks);
    const p = document.querySelector('.task-progress'); if (p) p.outerHTML = this.renderTaskProgress(item.tasks);
    this.showToast('Task removed', 'success'); this.loadItems();
  },

  showUpgradeModal() { this.showToast('Premium coming soon! 🚀', 'success'); },
  closeItemModal() { document.getElementById('item-modal')?.classList.remove('active'); },

  // SETTINGS
  openSettings(e) { e?.preventDefault(); const user = Auth.getCurrentUser(); if (!user) return; document.getElementById('settings-name').value = user.displayName; document.getElementById('settings-email').value = user.email || ''; document.getElementById('settings-modal').classList.add('active'); document.getElementById('user-dropdown')?.classList.remove('active'); },
  closeSettingsModal() { document.getElementById('settings-modal')?.classList.remove('active'); },
  handleSettingsSubmit(e) { e.preventDefault(); try { Auth.updateProfile({ displayName: document.getElementById('settings-name').value.trim(), email: document.getElementById('settings-email').value.trim() }); this.updateUserInfo(); this.closeSettingsModal(); this.showToast('Saved!', 'success'); } catch (err) { this.showToast(err.message, 'error'); }},
  backupUserData() { const user = Auth.getCurrentUser(); if (!user) return; const backup = { version: APP_CONFIG.version, items: Storage.getUserItems(user.id), favorites: Storage.getFavorites(user.id) }; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })); a.download = `${APP_CONFIG.storagePrefix}-backup.json`; a.click(); this.showToast('Backup downloaded!', 'success'); },
  restoreUserData(e) { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { try { const backup = JSON.parse(ev.target.result); const user = Auth.getCurrentUser(); if (!user || !backup.items) throw new Error('Invalid'); if (!confirm(`Restore ${backup.items.length} items?`)) return; const all = Storage.getAllItems(); backup.items.forEach(item => { const id = Storage.generateId(); all[id] = { ...item, id, userId: user.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; }); Storage.saveAll(Storage.KEYS.ITEMS, all); this.loadItems(); this.updateStats(); this.closeSettingsModal(); this.showToast('Restored!', 'success'); } catch (err) { this.showToast('Restore failed', 'error'); }}; reader.readAsText(file); e.target.value = ''; },

  // CACHE
  openCacheViewer() { this.loadCacheSummary(); this.loadCacheItems(); this.loadCacheRaw(); document.getElementById('cache-modal').classList.add('active'); },
  closeCacheModal() { document.getElementById('cache-modal')?.classList.remove('active'); },
  switchCacheTab(tab) { document.querySelectorAll('.cache-tab').forEach(t => t.classList.remove('active')); document.querySelector(`.cache-tab[data-cache-tab="${tab}"]`)?.classList.add('active'); document.querySelectorAll('.cache-tab-content').forEach(c => c.classList.remove('active')); document.getElementById(`cache-${tab}-tab`)?.classList.add('active'); },
  loadCacheSummary() { const user = Auth.getCurrentUser(); if (!user) return; const items = Storage.getUserItems(user.id); document.getElementById('cache-summary-grid').innerHTML = `<div class="cache-summary-card"><div class="cache-summary-value">${items.length}</div><div class="cache-summary-label">Projects</div></div><div class="cache-summary-card"><div class="cache-summary-value">${Storage.getFavorites(user.id).length}</div><div class="cache-summary-label">Favorites</div></div>`; document.getElementById('cache-size').textContent = `Total: ${(JSON.stringify(items).length / 1024).toFixed(2)} KB`; },
  loadCacheItems() { const user = Auth.getCurrentUser(); if (!user) return; const items = Storage.getUserItems(user.id); document.getElementById('cache-items-list').innerHTML = items.length === 0 ? '<p style="color:var(--gray);text-align:center;padding:2rem">No projects</p>' : items.map(item => `<div class="cache-item"><div class="cache-item-header"><span class="cache-item-icon">${item.icon || '🏠'}</span><span class="cache-item-title">${this.escapeHtml(item.name)}</span></div><div class="cache-item-meta"><span>ID: ${item.id}</span></div></div>`).join(''); },
  loadCacheRaw() { const user = Auth.getCurrentUser(); if (!user) return; document.getElementById('cache-raw-view').textContent = JSON.stringify({ items: Storage.getUserItems(user.id) }, null, 2); },
  clearMyCache() { const user = Auth.getCurrentUser(); if (!user || ['admin','demo'].includes(user.username)) { this.showToast('Cannot clear', 'error'); return; } if (!confirm('Delete all?')) return; const all = Storage.getAllItems(); Object.keys(all).forEach(id => { if (all[id].userId === user.id) delete all[id]; }); Storage.saveAll(Storage.KEYS.ITEMS, all); this.loadItems(); this.updateStats(); this.closeCacheModal(); this.closeSettingsModal(); this.showToast('Cleared', 'success'); },

  // ADMIN
  openAdminPanel(e) { e?.preventDefault(); const user = Auth.getCurrentUser(); if (!user?.isAdmin) { this.showToast('Admin only', 'error'); return; } this.loadAdminStats(); this.loadAdminUsers(); this.loadChangelog(); document.getElementById('admin-modal').classList.add('active'); document.getElementById('user-dropdown')?.classList.remove('active'); },
  closeAdminModal() { document.getElementById('admin-modal')?.classList.remove('active'); },
  switchAdminTab(tab) { document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active')); document.querySelector(`.admin-tab[data-admin-tab="${tab}"]`)?.classList.add('active'); document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active')); document.getElementById(`admin-${tab}-tab`)?.classList.add('active'); },
  loadAdminStats() { document.getElementById('admin-stats-grid').innerHTML = `<div class="admin-stat-card"><div class="admin-stat-value">${Object.keys(Storage.getUsers()).length}</div><div class="admin-stat-label">Users</div></div><div class="admin-stat-card"><div class="admin-stat-value">${Object.keys(Storage.getAllItems()).length}</div><div class="admin-stat-label">Projects</div></div>`; document.getElementById('admin-app-version').textContent = APP_CONFIG.version; },
  loadAdminUsers() { document.getElementById('admin-users-list').innerHTML = Object.values(Storage.getUsers()).map(u => `<div class="user-row"><div class="user-info"><div class="user-avatar-small">${u.displayName.charAt(0).toUpperCase()}</div><div><div class="user-row-name">${this.escapeHtml(u.displayName)}</div><div class="user-row-username">@${u.username} ${u.isAdmin ? '🛡️' : ''}</div></div></div><div class="user-meta">Joined: ${this.formatDate(u.createdAt)}</div></div>`).join(''); },
  loadChangelog() { const c = document.getElementById('changelog-content'); if (!c || !APP_CONFIG.changelog) return; c.innerHTML = APP_CONFIG.changelog.map(e => `<div class="changelog-version"><h3>${e.version} <span class="changelog-date">${e.date}</span></h3><ul>${e.changes.map(ch => `<li>${ch}</li>`).join('')}</ul></div>`).join(''); },
  exportAllData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(Storage.exportData(), null, 2)], { type: 'application/json' })); a.download = `${APP_CONFIG.storagePrefix}-export.json`; a.click(); this.showToast('Exported!', 'success'); },
  resetAllData() { if (!confirm('Delete ALL?')) return; if (prompt('Admin password:') !== APP_CONFIG.defaultAdmin.password) { this.showToast('Wrong', 'error'); return; } Storage.clearAll(); this.closeAdminModal(); Auth.logout(); this.showToast('Reset!', 'success'); this.showAuthScreen(); },

  // LEGAL
  showLegal(e, type) { e?.preventDefault(); document.getElementById('legal-modal-title').textContent = type === 'terms' ? 'Terms of Service' : 'Privacy Policy'; document.getElementById('legal-content').innerHTML = type === 'terms' ? `<p class="legal-updated">Last updated: January 2026</p><h3>1. Acceptance</h3><p>By using ${APP_CONFIG.name}, you agree to these terms.</p><h3>2. Service</h3><p>A home renovation tracking app.</p><h3>3. Accounts</h3><p>You are responsible for your account security.</p><h3>4. Content</h3><p>You own your content.</p><h3>5. Use</h3><p>Don't misuse the service.</p><h3>6. Data</h3><p>Stored locally in your browser.</p><h3>7. Disclaimer</h3><p>Provided "as is".</p><h3>8. Liability</h3><p>We're not liable for damages.</p><h3>9. Changes</h3><p>Terms may change.</p>` : `<p class="legal-updated">Last updated: January 2026</p><h3>1. Collection</h3><p>Account info and project data.</p><h3>2. Use</h3><p>Stored locally to provide service.</p><h3>3. Storage</h3><p>Browser localStorage only.</p><h3>4. Security</h3><p>Use backup feature.</p><h3>5. Rights</h3><p>Access, export, delete anytime.</p><h3>6. Changes</h3><p>Policy may update.</p>`; document.getElementById('legal-modal').classList.add('active'); },
  closeLegalModal() { document.getElementById('legal-modal')?.classList.remove('active'); },

  // UTILS
  showToast(msg, type = 'success') { const t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span><span class="toast-message">${this.escapeHtml(msg)}</span>`; document.getElementById('toast-container').appendChild(t); setTimeout(() => { t.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => t.remove(), 300); }, 3000); },
  escapeHtml(t) { if (!t) return ''; const d = document.createElement('div'); d.textContent = t; return d.innerHTML; },
  formatDate(d) { const dt = new Date(d); return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: dt.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined }); },
  adjustColor(hex, amt) { if (!hex) return '#3b82f6'; const n = parseInt(hex.replace('#',''),16); return '#'+(0x1000000+Math.min(255,Math.max(0,(n>>16)+amt))*0x10000+Math.min(255,Math.max(0,((n>>8)&0xFF)+amt))*0x100+Math.min(255,Math.max(0,(n&0xFF)+amt))).toString(16).slice(1); }
};

document.addEventListener('DOMContentLoaded', () => App.init());
