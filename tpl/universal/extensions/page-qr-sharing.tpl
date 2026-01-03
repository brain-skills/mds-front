{if in_array($module, $config.extensions.qr_codes)}
    <div class="share-box">
        <div class="share-buttons">
            {if $pageQrSharingConf.telegram === true}
                <a class="icon-btn"
                   href="https://t.me/share/url?url={$shareUrl}&text={$shareTitle}"
                   target="_blank">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path fill="#0088cc" d="M9.036 15.203l-.396 5.583c.568 0 .814-.244 1.111-.536l2.665-2.544 5.518 4.027c1.01.556 1.719.263 1.989-.938l3.596-16.89c.331-1.416-.512-1.97-1.439-1.628L1.63 9.356C.254 9.895.263 10.672 1.378 11.02l5.596 1.744L18.673 4.65c.525-.338 1.005-.15.612.188"/>
                    </svg>
                </a>
            {/if}
            {if $pageQrSharingConf.facebook === true}
                <a class="icon-btn"
                   href="https://www.facebook.com/sharer/sharer.php?u={$shareUrl}"
                   target="_blank">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path fill="#1877f2" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12"/>
                    </svg>
                </a>
            {/if}
            {if $pageQrSharingConf.qr_code_sharing === true}
                <button class="icon-btn" onclick="document.getElementById('qrModal').style.display='flex'">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path fill="#000" d="M3 3h8v8H3V3m2 2v4h4V5H5m10-2h8v8h-8V3m2 2v4h4V5h-4M3 13h8v8H3v-8m2 2v4h4v-4H5M17 13h2v2h-2v-2m4 0h2v2h-2v-2m-4 4h2v2h-2v-2m4 0h2v2h-2v-2m-4 4h2v2h-2v-2m4 0h2v2h-2v-2"/>
                    </svg>
                </button>
            {/if}
        </div>
    </div>

    <div id="qrModal">
        <div class="modal-content">
            <img src="{$qrCode}" alt="QR">
            <button class="close-btn" onclick="document.getElementById('qrModal').style.display='none'">Закрыть</button>
        </div>
    </div>

    <style>
        .share-buttons {
            display:flex;
            gap:12px;
            margin-top:10px;
        }
        .icon-btn {
            width:40px;
            height:40px;
            border-radius:8px;
            background:#f2f2f2;
            display:flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
            border:none;
            padding:0;
        }
        .icon-btn:hover {
            background:#e3e3e3;
        }

        #qrModal {
            position:fixed;
            top:0; left:0; right:0; bottom:0;
            background:rgba(0,0,0,0.5);
            display:none;
            justify-content:center;
            align-items:center;
            z-index:9999;
        }
        #qrModal .modal-content {
            background:#fff;
            padding:15px;
            border-radius:12px;
            text-align:center;
            width:260px;
        }
        #qrModal img {
            width:220px;
            height:220px;
        }
        .close-btn {
            margin-top:12px;
            background:#000;
            color:#fff;
            padding:6px 12px;
            border-radius:6px;
            cursor:pointer;
            border:none;
        }
    </style>
{/if}
