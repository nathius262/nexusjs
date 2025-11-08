// Template generators
function generateAdminCreateView(moduleName, modelName) {
  return `
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Create ${modelName}</h1>
      <a href="/admin/${moduleName}" class="btn btn-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to List
      </a>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form action="/admin/${moduleName}/create" id="create-form" class="needs-validation" method="POST" novalidate>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Enter name" required>
                <div class="invalid-feedback">
                  Please provide a valid name.
                </div>
              </div>
            </div>
            <!-- Add more form fields in columns as needed -->
          </div>

          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-plus me-2"></i>Create ${modelName}
            </button>
            <a href="/admin/${moduleName}" class="btn btn-outline-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="/assets/js/form-handler.js"></script>

  <!-- 
    always use this when you intend on uploading images or files and comment the above script 
  -->
  <!-- <script type="module" src="/assets/js/uploader.js"></script> -->
  `;
}

function generateAdminUpdateView(moduleName, modelName) {
  return `
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Update ${modelName}</h1>
      <a href="/admin/${moduleName}" class="btn btn-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to List
      </a>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form action="/admin/${moduleName}/{{${moduleName}.id}}" id="update-form" class="needs-validation" method="POST" novalidate>
          <input type="hidden" name="_method" value="PUT">
          
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" class="form-control" id="name" value="{{${moduleName}.name}}" required>
                <div class="invalid-feedback">
                  Please provide a valid name.
                </div>
              </div>
            </div>
            <!-- Add more form fields in columns as needed -->
          </div>

          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save me-2"></i>Update ${modelName}
            </button>
            <a href="/admin/${moduleName}" class="btn btn-outline-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="/assets/js/form-handler.js"></script>

  <!-- 
    always use this when you intend on uploading images or files and comment the above script 
  -->
  <!-- <script type="module" src="/assets/js/uploader.js"></script> -->
  `;
}

function generateAdminListView(moduleName, modelName) {
  return `
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">${modelName} Management</h1>
      <a href="/admin/${moduleName}/create" class="btn btn-primary">
        <i class="fas fa-plus me-2"></i>Create New
      </a>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <!-- Add your table headers here -->
                <th>Name</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {{#each ${moduleName}s}}
                <tr>
                  <td>{{this.id}}</td>
                  <!-- Add your table cells here -->
                  <td>{{this.name}}</td>
                  <td>{{formatDate this.createdAt}}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <a href="/admin/${moduleName}/{{this.id}}" class="btn btn-outline-primary">
                        <i class="fas fa-edit"></i>
                      </a>
                      <button data-delete="${moduleName}-{{this.id}}" data-name="{{this.id}}" 
                          data-url="/admin/${moduleName}/{{this.id}}" class="btn btn-danger btn-sm"
                      >
                          <i class="fas fa-trash me-1"></i>Delete
                      </button>
                    </div>
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
        
        {{> pagination}}
      </div>
    </div>
  </div>
  `;
}

function generatePublicListView(moduleName, modelName) {
  return `
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h1 class="h2 mb-4">${modelName} List</h1>
        
        <div class="row">
          {{#each ${moduleName}s}}
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">{{this.name}}</h5>
                  <p class="card-text text-muted">ID: {{this.id}}</p>
                  <a href="/${moduleName}/{{this.id}}" class="btn btn-outline-primary btn-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          {{/each}}
        </div>
        
        {{> pagination}}
      </div>
    </div>
  </div>
  `;
}

function generatePublicSingleView(moduleName, modelName) {
  return `
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/${moduleName}">${modelName} List</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{${moduleName}.name}}</li>
          </ol>
        </nav>

        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <h1 class="h3 mb-0">{{${moduleName}.name}} || '${modelName} Details'}}</h1>
          </div>
          <div class="card-body">
            <dl class="row">
              <!-- Add your detail fields here -->
              <dt class="col-sm-3">ID</dt>
              <dd class="col-sm-9">{{${moduleName}.id}}</dd>
              
              <dt class="col-sm-3">Name</dt>
              <dd class="col-sm-9">{{${moduleName}.name}}</dd>
              
              <!-- Add more fields as needed -->
            </dl>
          </div>
          <div class="card-footer">
            <a href="/${moduleName}" class="btn btn-secondary">
              <i class="fas fa-arrow-left me-2"></i>Back to List
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateAdminCreateView,
  generateAdminListView,
  generateAdminUpdateView,
  generatePublicListView,
  generatePublicSingleView
};