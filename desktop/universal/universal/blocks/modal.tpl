<div class="modal fade" id="ptcModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Content will be injected here -->
            </div>
        </div>
    </div>
</div>
<!-- Hidden elements with content -->
<div id="policyContent" style="display: none;">{$policy}</div>
<div id="termsContent" style="display: none;">{$terms}</div>
<div id="cookiesContent" style="display: none;">{$cookies}</div>
<div id="applicationForm" style="display: none;">{include file="../widgets/event_participants.tpl"}</div>