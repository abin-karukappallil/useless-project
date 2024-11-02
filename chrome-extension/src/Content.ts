import { runtime } from 'webextension-polyfill'

type TextMessage = {
    key: string;
    type: string;
    value: string;
}

const inputs = document.querySelectorAll('input[type="text"], textarea');

const sendText = (event: Event) => {
    const text = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    runtime.sendMessage({ type: 'textChange', key: "", value: text });
}

const sendExecute = (event: Event) => {
    const text = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    runtime.sendMessage({ type: 'execute', key: "", value: text }).then((response) => {
        let cursorPos = (event.target as HTMLInputElement | HTMLTextAreaElement).selectionStart;
        console.log(response);
        if (response){
            let beforeCursor = text.substring(0, cursorPos!);
            let afterCursor = text.substring(cursorPos!);
            (event.target as HTMLInputElement | HTMLTextAreaElement).value = (beforeCursor + afterCursor).replace((response as TextMessage).key, (response as TextMessage).value);
            (event.target as HTMLInputElement | HTMLTextAreaElement).selectionStart = (event.target as HTMLInputElement | HTMLTextAreaElement).selectionEnd = text.indexOf((response as TextMessage).key) + (response as TextMessage).value.length;
        }
    });
}

inputs.forEach(input => {
    input.addEventListener('input', sendText);
    input.addEventListener('paste', sendText);
    input.addEventListener('keydown', (event: any) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            sendText(event);
        }
        if (event.key === "Enter") {
            sendExecute(event);
        }
    });
});

// runtime.onMessage.addListener(async (message: unknown, sender, sendResponse) => {
//     console.log((message as TextMessage).element.value);
//     (message as TextMessage).element.value = "haha";
//     console.log((message as TextMessage).element.value);

    // if ((message as TextMessage).type === 'textUpdate') {
    //     (message as TextMessage).element.value = (message as TextMessage).element.value.replace((message as TextMessage).key, (message as TextMessage).value);
    // }
// });

export {}