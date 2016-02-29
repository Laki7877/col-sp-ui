# Angular
Angular JS part of the application resides here.

### controllers
Contains all controllers.
Any new controller must be added to `app.js` manually.

### directives
Contains all legacy "non-NC" directives. (see `nc` section below)
Any new directive must be added to `app.js` manually.

### filters
Contains all filters.
Any new filter must be added to `app.js` manually.

### helpers
Contains all helpers factory/services.
Any new helper must be added to `app.js` manually.

### nc 
The "new" NC convention module. All "NC" directives and NC things are declared here.
There is no need explicitly include submodule inside app.js, as entire nc module is loaded automagically.

### services
Contains all the service layer code, such as Product service, Brand service, and so on.
Service layer encapsulates API calls, serialization logics and other auxilary function specific
to services. 

Any new service must be added to `app.js` manually.

### template-options
Contains all the template options configurations used by NcTemplate forms.
Template Options supports validation, hinting and other template specific options.
See template directory : `/templates`

