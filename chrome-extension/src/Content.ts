import { runtime } from 'webextension-polyfill';

type TextMessage = {
    key: string;
    type: string;
    value: string;
};

const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type="text"], textarea');

const sendText = (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const text = target.value;
    runtime.sendMessage({ type: 'textChange', key: "", value: text });
};

const sendExecute = async (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const text = target.value;
    const cursorPos = target.selectionStart;

    try {
        const response = await runtime.sendMessage({ type: 'execute', key: "", value: text });
        if (response) {
            const { key, value } = response as TextMessage;
            const beforeCursor = text.substring(0, cursorPos!);
            const afterCursor = text.substring(cursorPos!);
            
            target.value = beforeCursor.replace(key, value) + afterCursor;
            const newCursorPos = beforeCursor.indexOf(key) + value.length;
            target.selectionStart = target.selectionEnd = newCursorPos;
        }
    } catch (error) {
        console.error("Error in sendExecute:", error);
    }
};

inputs.forEach(input => {
    input.addEventListener('input', sendText);
    input.addEventListener('paste', sendText);
    input.addEventListener('keydown', (event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete') {
            sendText(event);
        }
        if (keyboardEvent.key === "Enter") {
            keyboardEvent.preventDefault(); 
            sendExecute(keyboardEvent);
        }
    });
});

runtime.onMessage.addListener(async (message: unknown, sender, sendResponse) => {
    if (typeof message === 'object' && message !== null && 'type' in message) {
        const { type, key, value } = message as TextMessage;

        if (type === 'textUpdate') {
            const target = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
            if (target) {
                target.value = target.value.replace(key, value);
                console.log("Updated value:", target.value);
                sendResponse({ success: true });
            }
        }
    }
    return true;
});

export {};
