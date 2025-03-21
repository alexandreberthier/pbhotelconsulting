
import { ref } from 'vue';

export type ToastType = 'success' | 'error';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

export const toasts = ref<Toast[]>([]);

export function addToast(type: ToastType, message: string) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, type, message };

    toasts.value.push(newToast);

    setTimeout(() => {
        deleteToast(id);
    }, 5000);
}

export function deleteToast(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
}
