<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<!-- Trigger Button -->
<li class="nav-item">
  <button class="btn lang-btn ll-btn-trigger border-1 text-white mx-2" type="button" data-bs-toggle="modal" data-bs-target="#languageLocationModal" id="selectedLangLocBtn" aria-label="Settings" title="Select Language & Location">
  	<span class="d-flex gap-2">
      <span class="d-flex align-items-center gap-1">
        <img loading="lazy" width="18" src="{$theme}/assets/images/tl.webp" class="" alt="">
        {if !empty($locationSlug) && !empty($locationName)} {$locationSlug}  {else}{/if}    
      </span>
      <li class="nav-item align-self-center">
      	<div class="vr d-flex"></div>
      </li>
        <img
          loading="lazy"
          src="{$engine}/lang/{$selectedLang}/icon.png"
          alt="{$selectedLang} flag"
          class="align-self-center selected-language"
          style="width:22px; height:22px;"
        />
      <li class="nav-item align-self-center">
      	<div class="vr d-flex"></div>
      </li>
      <span class="d-flex align-items-center gap-1">
        <img loading="lazy" width="18" src="{$theme}/assets/images/currency.svg" class="" alt="">
        {if (!empty($selectedCurrency))} {$selectedCurrency} {else}{$currency}{/if}
      </span>
  	</span>
  </button>
</li>

<!-- Modal -->
<div class="modal fade" id="languageLocationModal" tabindex="-1" aria-labelledby="languageLocationModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content ll-modal-content shadow-lg border-0 rounded-2 bg-light">
    
      <!-- Modal Header -->
      <div class="modal-header ll-modal-header border-0 pb-2">
        <h5 class="fw-normal modal-title ll-modal-title text-primary w-100  text-center" id="languageLocationModalLabel">
          Select Language, Location & Currency
        </h5>
      </div>

      <!-- Modal Body -->
      <div class="modal-body ll-modal-body">
        <form method="post" id="languageLocationForm">
          <input type="hidden" name="unique_form_id" value="language_selection_form" />
          <input type="hidden" name="current_url" value="{$current_url}" />
          <input type="hidden" name="location" id="selectedLocationInput" value=""
          />
          <input type="hidden" name="lang" id="selectedLanguageInput" value="" />
          <input type="hidden" name="currency" id="selectedCurrencyInput" value="" />

		  {* Рекурсивная функция *}
          {function name=renderTree item=$item}
            <div class="tree-item" data-id="{$item.id}">
              <button type="button" class="dropdown-item d-flex justify-content-between align-items-center p-2 toggle-btn">
                {$item.name} {if !empty($item.slug)} | {$item.slug} {else}{/if} <span class="arrow">{if $item.children|@count > 0}{/if}</span>
              </button>

              {if $item.children|@count > 0}
                <div class="children ps-3">
                  {foreach $item.children as $child}
                    {call name=renderTree item=$child}
                  {/foreach}
                </div>
              {/if}
            </div>
          {/function}

          <div class="mb-3 d-flex align-items-center gap-2">
          	<i class="bi bi-geo-alt-fill" style="color:#007bff;"></i>
            <label class="form-label ll-form-label mb-0" style="width: 100px;">
              Location
            </label>
            <div class="dropdown w-100" id="locationDropdownWrapper">
              <button
                class="btn ll-btn-langloc-outline w-100 d-flex justify-content-between align-items-center rounded-pill px-3 py-2  border-1"
                type="button"
                id="displayedLocationButton"
              >
                Select Location <span class="ms-2">&#9662;</span>
              </button>
              <div class="dropdown-menu ll-dropdown-list w-100 shadow-sm" id="locationList" style="display:none;">
                {foreach $locationsTree as $item}
                  {call name=renderTree item=$item}
                {/foreach}
              </div>
            </div>
            <input type="hidden" id="location-selected">
          </div>

          <!-- Language Dropdown -->
          <div class="mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-translate" style="color:#007bff;"></i>
            <label class="form-label ll-form-label mb-0" style="width: 100px;">Language</label>
            <div class="dropdown w-100">
              <button
                class="btn ll-btn-langloc-outline w-100 d-flex justify-content-between align-items-center rounded-pill px-3 py-2 border-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="displayedLanguageButton"
              >
                Select Language <span class="ms-2">&#9662;</span>
              </button>
              <ul class="dropdown-menu ll-dropdown-list w-100 shadow-sm" id="languageList">
                {foreach from=$available_languages item=language}
                  <li>
                    <button
                      class="dropdown-item ll-lang-btn d-flex align-items-center p-2"
                      type="button"
                      data-value="{$language}"
                    >
                      <img
                        src="{$engine}/lang/{$language}/icon.png"
                        alt="{$language} flag"
                        class="me-2"
                        style="width:20px; height:20px;"
                      />
                      {$language}
                    </button>
                  </li>
                {/foreach}
              </ul>
            </div>
          </div>

          <!-- Currency Dropdown -->
          <div class="mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-currency-dollar" style="color:#007bff;"></i>
            <label class="form-label ll-form-label mb-0" style="width: 100px;">Currency</label>
            <div class="dropdown w-100">
              <button
                class="btn ll-btn-langloc-outline w-100 d-flex justify-content-between align-items-center rounded-pill px-3 py-2 border-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="displayedCurrencyButton"
              >
                Select Currency <span class="ms-2">&#9662;</span>
              </button>
              <ul class="dropdown-menu ll-dropdown-list w-100 shadow-sm p-1" id="currencyList">
                <li>
                  <button
                    class="dropdown-item ll-currency-btn d-flex align-items-center p-2"
                    type="button"
                    data-value="USD"
                  >
                    USD
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item ll-currency-btn d-flex align-items-center p-2"
                    type="button"
                    data-value="EUR"
                  >
                    EUR
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item ll-currency-btn d-flex align-items-center p-2"
                    type="button"
                    data-value="RUB"
                  >
                    RUB
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Save Button -->
          <button type="submit" class="btn ll-btn-save-pref btn-primary w-50 rounded-pill py-2 mt-3 fw-bold py-0">
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- TODO: Remove styles from this file-->
<style>
  .modal-title{
    font-size: 20px !important;
  }
  .lang-btn {
    border: 1px solid #fff;
  }
  .lang-btn:hover,
  .lang-btn:focus,
  .lang-btn:active {
    border: 1px solid #fff !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .selected-language{
      position: relative;
      left:1px;
  }
</style>
<script src="{$theme}/assets/js/language.js"></script>