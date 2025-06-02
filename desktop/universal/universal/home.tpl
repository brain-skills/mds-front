{include file="./modules/events/latest_entries.tpl"}

<div class="row">
  <div class="col-12">
    <h5>{$lang.homepage.faq}</h5>
  </div>
  <div class="col-12 col-md-6">
    <div class="card">
      <div class="accordion accordion-flush" id="accordion_1">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac1_item1">{$lang.homepage.about_button}</button>
          </h2>
          <div id="ac1_item1" class="accordion-collapse collapse" data-bs-parent="#accordion_1">
            <div class="accordion-body">{$lang.homepage.about_description}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac1_item2">{$lang.homepage.consultation_button}</button>
          </h2>
          <div id="ac1_item2" class="accordion-collapse collapse" data-bs-parent="#accordion_1">
            <div class="accordion-body">{$lang.homepage.consultation_description}sdfsfsdfsdfsdfsdf</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac1_item3">{$lang.homepage.events_button}</button>
          </h2>
          <div id="ac1_item3" class="accordion-collapse collapse" data-bs-parent="#accordion_1">
            <div class="accordion-body">{$lang.homepage.events_description}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <div class="card">
      <div class="accordion accordion-flush" id="accordion_2">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac2_item1">{$lang.homepage.benefits_button}</button>
          </h2>
          <div id="ac2_item1" class="accordion-collapse collapse" data-bs-parent="#accordion_2">
            <div class="accordion-body">{$lang.homepage.benefits_description}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac2_item2">{$lang.homepage.resources_button}</button>
          </h2>
          <div id="ac2_item2" class="accordion-collapse collapse" data-bs-parent="#accordion_2">
            <div class="accordion-body">{$lang.homepage.resources_description}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac2_item3">{$lang.homepage.recordings_button}</button>
          </h2>
          <div id="ac2_item3" class="accordion-collapse collapse" data-bs-parent="#accordion_2">
            <div class="accordion-body">{$lang.homepage.recordings_description}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-lg-4">
    <div class="card mb-0">
      <div class="card-body d-flex align-items-start">
        <a href="#" class="bg-success bg-opacity-10 text-success rounded-pill p-2 mt-1 me-4">
          <i class="fa fa-file-text fs-2"></i>
        </a>
        <div class="flex-fill">
          <h6 class="fw-semibold mb-1">
            <a href="#" class="text-body">{$lang.homepage.knowledge_base_button}</a>
          </h6>
          <a href="#" class="btn btn-sm btn-outline-success mb-1 py-0">{$lang.homepage.details_button}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="card mb-0">
      <div class="card-body d-flex align-items-start">
        <a href="#" class="bg-warning bg-opacity-10 text-warning rounded-pill p-2 mt-1 me-4">
          <i class="fa fa-life-ring fs-2"></i>
        </a>
        <div class="flex-fill">
          <h6 class="fw-semibold mb-1">
            <a href="#" class="text-body">{$lang.homepage.support_center_button}</a>
          </h6>
          <a href="#" class="btn btn-sm btn-outline-warning mb-1 py-0">{$lang.homepage.details_button}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="card mb-0">
      <div class="card-body d-flex align-items-start">
        <a href="#" class="bg-primary bg-opacity-10 text-primary rounded-pill p-2 mt-1 me-4">
          <i class="fa fa-newspaper-o fs-2"></i>
        </a>
        <div class="flex-fill">
          <h6 class="fw-semibold mb-1">
            <a href="#" class="text-body">{$lang.homepage.applications_list_button}</a>
          </h6>
          <a href="#" class="btn btn-sm btn-outline-primary mb-1 py-0">{$lang.homepage.details_button}</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="card card-body mt-4">
  <div class="d-flex align-items-center align-items-lg-start flex-column flex-lg-row">
    <div class="bg-success bg-opacity-10 text-success lh-1 rounded-pill p-2 me-lg-3 mb-3 mb-lg-0">
      <i class="fa fa-search"></i>
    </div>
    <div class="flex-fill text-center text-lg-start">
      <h6 class="mb-0">{$lang.homepage.not_found_question}</h6>
      <span class="text-muted">{$lang.homepage.not_found_description}</span>
    </div>
    <a href="#" class="btn btn-success align-self-lg-center ms-lg-3 mt-3 mt-lg-0">
      <i class="ph-chat me-2"></i> {$lang.homepage.submit_request_button}</a>
  </div>
</div>