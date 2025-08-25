import 'flowbite';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();


// Custom Alert --------------
/**
 * Show custom alert with auto-dismiss and optional type
 * @param {string} msg - The message to show
 * @param {'success'|'danger'|'warning'} type - The alert type
 */
window.customAlert = function (msg, type = 'success', isFront = false) {
    const types = {
        success: {
            bg: 'bg-green-50 dark:bg-gray-800',
            text: 'text-green-800 dark:text-green-400',
            close: 'bg-green-50 text-green-500 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400'
        },
        danger: {
            bg: 'bg-red-50 dark:bg-gray-800',
            text: 'text-red-800 dark:text-red-400',
            close: 'bg-red-50 text-red-500 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400'
        },
        warning: {
            bg: 'bg-yellow-50 dark:bg-gray-800',
            text: 'text-yellow-800 dark:text-yellow-300',
            close: 'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300'
        }
    };

    const alertType = types[type] || types.success;
    const alertId = `alert-${Date.now()}`;
    const container = document.getElementById('alert-container');

    const alertHTML = `
        <div id="${alertId}" class="mb-4 flex items-center rounded-lg p-4 ${alertType.bg} ${alertType.text}" role="alert">
            <svg class="h-4 w-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">${msg}</div>
            <button id="close-${alertId}" type="button" class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg ${alertType.close}" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', alertHTML);

    const targetEl = document.getElementById(alertId);
    const triggerEl = document.getElementById(`close-${alertId}`);

    // Create Dismiss instance for manual close
    const dismiss = new Dismiss(targetEl, triggerEl, {
        transition: 'transition-opacity',
        duration: 300,
        timing: 'ease-out',
        onHide: () => {
            targetEl.remove();
        }
    }, {
        id: alertId,
        override: true
    });

    setTimeout(() => {
        dismiss.hide();
    }, 10000);
};
