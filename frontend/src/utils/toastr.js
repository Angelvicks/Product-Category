import toastr from 'toastr';

toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    rtl: true,
    onclick: null,
    showDuration: '1000',
    hideDuration: '2000',
    timeOut: '7000',
    extendedTimeOut: '2000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

export const toastSuccess = (msg, titleMsg, timeout = null) => {
    if (!(timeout)) {
        toastr.options.timeOut = timeout;
    }
    return toastr.success(`${msg || 'Success'}`, `${titleMsg || 'Success'}`);
};
export const toastError = (msg, titleMsg, timeout = null) => {
    if (!(timeout)) {
        toastr.options.timeOut = timeout;
    }
    return toastr.error(`${msg || 'Error'}`, `${titleMsg || 'Error'}`);
};
export const toastWarning = (msg, titleMsg, timeout = null) => {
    if (!(timeout)) {
        toastr.options.timeOut = timeout;
    }
    return toastr.warning(`${msg || 'Warning'}`, `${titleMsg || 'Warning'}`);
};
export const toastInfo = (msg, titleMsg, timeout = null) => {
    if (!(timeout)) {
        toastr.options.timeOut = timeout;
    }
    return toastr.info(`${msg || 'Info'}`, `${titleMsg || 'Info'}`);
};