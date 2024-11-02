import Browser, { runtime } from 'webextension-polyfill';

const patternSingleQuotes = /\buseless\('.*?'\)/;
const patternDoubleQuotes = /\buseless\(".*?"\)/;

type TextMessage = {
    key: string;
    type: 'textChange' | 'execute'; 
    value: string;
    element: HTMLInputElement | HTMLTextAreaElement;
}

type ToggleMessage = {
    type: 'toggle'; 
    isActive: boolean; 
}

type IncomingMessage = TextMessage | ToggleMessage;

let data: string = "";
let isActive: boolean = false; 

const apiRequest = async (text: string) => {
    const res = await fetch(`https://useless-project-drab.vercel.app/request?text=${text}`);
    if (res.ok) {
        const jsonData = await res.json();
        return jsonData.status === "success" ? jsonData : false;
    }
    return false;
};

function isToggleMessage(message: unknown): message is ToggleMessage {
    return (message as ToggleMessage).type === 'toggle';
}

runtime.onMessage.addListener(async (message: unknown, sender, sendResponse) => {
    if (typeof message === 'object' && message !== null) {
        if ('type' in message) {
            if ((message as TextMessage).type === 'textChange') {
                data = (message as TextMessage).value;
            }
            if ((message as TextMessage).type === 'execute') {
                if (!isActive) return false;

                data = (message as TextMessage).value;
                if (patternDoubleQuotes.test(data)) {
                    const query = data.split('useless("')[1].split('"')[0].replace("\n", "");
                    if (query.length > 0) {
                        const api = await apiRequest(query);
                        if (api) {
                            return { type: "textUpdate", key: `useless("${query}")`, value: api.message };
                        }
                    }
                }
                if (patternSingleQuotes.test(data)) {
                    const query = data.split("useless('")[1].split("'")[0].replace("\n", "");
                    if (query.length > 0) {
                        const api = await apiRequest(query);
                        if (api) {
                            return { type: "textUpdate", key: `useless('${query}')`, value: api.message };
                        }
                    }
                }
            }
            if (isToggleMessage(message)) {
                isActive = message.isActive; 
            }
        }
    }
    return false;
});

export {};
