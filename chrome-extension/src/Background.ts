import Browser, { runtime } from 'webextension-polyfill'

const patternSingleQuotes = /\buseless\('.*?'\)/;
const patternDoubleQuotes = /\buseless\(".*?"\)/;

type TextMessage = {
    key: string;
    type: string;
    value: string;
    element: HTMLInputElement | HTMLTextAreaElement;
}

var data: string = "";

const apiRequest = async (text: string) => {
    const res = await fetch(`http://localhost:8000/request?text=${text}`);
    console.log(res);
    if (res.ok){
        const jsonData = await res.json();
        if (jsonData.status == "success"){
            return jsonData;
        }else{
            return false;
        }
    }
}

runtime.onMessage.addListener(async (message: unknown, sender, sendResponse) => {
    if ((message as TextMessage).type === 'textChange') {
        data = (message as TextMessage).value;
    }
    if ((message as TextMessage).type === 'execute') {
        data = (message as TextMessage).value;
        if (patternDoubleQuotes.test(data)){
            let query = data.split('useless("')[1].split('"')[0].replace("\n", "");
            if (query.length > 0){
                const api: any = await apiRequest(query);
                console.log(query);
                if (api){
                    return { type: "textUpdate", key: `useless("${query}")`, value: api.message }
                }
            }
        }
        if (patternSingleQuotes.test(data)){
            let query = data.split("useless('")[1].split("'")[0].replace("\n", "");
            if (query.length > 0){
                const api: any = await apiRequest(query);
                console.log(query);
                if (api){
                    return { type: "textUpdate", key: `useless('${query}')`, value: api.message }
                }
            }
        }
    }
    return false;
});

// function custom(message: TextMessage){
//     Browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//         tabs.forEach((tab) => {
//             Browser.tabs.sendMessage(tab.id!, message);
//             Browser.runtime.sendMessage(tab, message);
//         });
//     });
// }


export {}