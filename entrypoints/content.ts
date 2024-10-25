import { defineContentScript } from 'wxt/sandbox';
import ai_icon from "@/assets/AI_Icon.svg";
import chat_icon from "@/assets/Chat_Icon.svg";
import add_icon from "@/assets/Add_Icon.svg";
import new_text from "@/assets/NewText_Icon.svg";

// Types
interface StyleProps {
  [key: string]: string;
}

// Constants
const LINKEDIN_SELECTORS = {
  MESSAGE_INPUT: '.msg-form__contenteditable',
  MESSAGE_INPUT_P: '.msg-form__contenteditable > p',
  CONTAINER: '.msg-form__container',
} as const;

const STATIC_RESPONSE = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

// Styles
const modalStyles: StyleProps = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: '101',
};

const aiIconStyles: StyleProps = {
  position: 'absolute',
  bottom: '0px',
  right: '0px',
  width: '35px',
  height: '35px',
  cursor: 'pointer',
  zIndex: '100',
};

// Helper Functions
const applyStyles = (element: HTMLElement, styles: StyleProps): void => {
  Object.assign(element.style, styles);
};

const createAIIcon = (): HTMLImageElement => {
  const icon = document.createElement('img');
  icon.className = 'ai-response-icon';
  icon.src = ai_icon;
  icon.alt = 'AI Icon';
  applyStyles(icon, aiIconStyles);
  return icon;
};

const createMessageDiv = (): HTMLDivElement => {
  const div = document.createElement('div');
  applyStyles(div, {
    marginTop: '10px',
    color: '#666D80',
    backgroundColor: '#DBEAFE',
    padding: '8px',
    border: '1px solid #d1f6d3',
    borderRadius: '5px',
    textAlign: 'left',
  });
  div.textContent = STATIC_RESPONSE;
  return div;
};

const createModalContent = (): string => `
  <div id='inner_modal' style="background:white; width:500px; padding:15px; border-radius:10px;">
    <div style="margin:2rem 0rem;width:auto;height:auto;text-align:right;overflow-y:auto;overflow-x:auto">
      <span id="userText" style="padding:8px;background:#DFE1E7;color:#666D80;display:none;border-radius:5px;"></span>
    </div>
    <input 
      type="text" 
      id="command-input" 
      placeholder="Your prompt" 
      style="width: 100%; padding: 8px; margin-bottom: 10px; outline:none; border: #C1C7D0"
    >
    <button id="generate-btn" style="margin-left:1rem;background-color: #3B82F6; color: white; padding:8px 20px; display:flex; justify-content:center; align-items:center; column-gap:5px; border-radius:8px;font-size:13px;font-weight:600;float:right;cursor:not-allowed;">
      <img src=${chat_icon} alt="chat_icon" style="width:15px;height:15px"><span>Generate</span>
    </button>
    <div id="new-btns" style="display:none">
      <button id="regenerate-btn" style="margin-left:1rem;background-color: #3B82F6; color: white; padding:8px 20px;display:flex; justify-content:center; align-items:center; column-gap:5px; border-radius:8px;font-size:13px;font-weight:600;float:right;cursor:not-allowed;">
        <img src=${new_text} alt="regenrate_icon" style="width:15px;height:15px"><span>Regenerate</span>
      </button>
      <button id="insert-btn" style="margin-left:1rem;background:none; color: #666D80; padding:8px 15px; display:flex; justify-content:center; align-items:center; column-gap:5px; border-radius:8px;border:1px solid #666D80;font-size:13px;font-weight:600;float:right;">
        <img src=${add_icon} alt="Insert_icon" style="width:15px;height:15px"><span>Insert</span>
      </button>
    </div>
  </div>
`;

class AIResponseHandler {
  private modal: HTMLDivElement | null = null;
  private messageDiv: HTMLDivElement | null = null;

  private handleGenerateClick(
    input: HTMLInputElement,
    userText: HTMLElement,
    generate: HTMLElement,
    newBtn: HTMLElement | null
  ): void {
    if (input.value.trim() === '') return;

    userText.textContent = input.value;
    userText.style.display = 'inline-block';
    input.value = '';
    generate.style.display = 'none';
    
    if (newBtn) {
      newBtn.style.display = 'block';
    }

    if (!this.messageDiv) {
      this.messageDiv = createMessageDiv();
      userText.parentNode?.insertBefore(this.messageDiv, userText.nextSibling);
    }
  }

  private setupInsertButton(modal: HTMLDivElement): void {
    const insertBtn = document.getElementById('insert-btn');
    if (!insertBtn) return;

    insertBtn.style.cursor = 'pointer';
    insertBtn.removeAttribute('disabled');

    insertBtn.addEventListener('click', () => {
      const linkedinMsgBox = document.querySelector(
        LINKEDIN_SELECTORS.MESSAGE_INPUT
      ) as HTMLElement;

      if (linkedinMsgBox && this.messageDiv) {
        linkedinMsgBox.focus();
        document.execCommand('insertText', false, this.messageDiv.textContent || '');
        modal.remove();
      }
    });
  }

  private setupInputListener(
    input: HTMLInputElement,
    generateBtn: HTMLElement
  ): void {
    input.addEventListener('input', () => {
      const isEmpty = input.value.trim() === '';
      generateBtn.style.cursor = isEmpty ? 'not-allowed' : 'pointer';
      if (isEmpty) {
        generateBtn.setAttribute('disabled', 'true');
      } else {
        generateBtn.removeAttribute('disabled');
      }
    });
  }

  public openModal(): void {
    this.modal = document.createElement('div');
    this.modal.className = 'ai-modal';
    applyStyles(this.modal, modalStyles);
    this.modal.setAttribute('aria-hidden', 'false');
    this.modal.innerHTML = createModalContent();

    document.body.appendChild(this.modal);

    // Setup modal click handler
    this.modal.addEventListener('click', (event: MouseEvent) => {
      if (event.target === this.modal) {
        this.modal?.remove();
        this.modal?.setAttribute('aria-hidden', 'true');
      }
    });

    // Setup input and button handlers
    const input = document.getElementById('command-input') as HTMLInputElement;
    const userText = document.getElementById('userText')!;
    const generate = document.getElementById('generate-btn')!;
    const newBtn = document.getElementById('new-btns');

    if (input && generate) {
      this.setupInputListener(input, generate);
      generate.addEventListener('click', () => {
        this.handleGenerateClick(input, userText, generate, newBtn);
        this.setupInsertButton(this.modal!);
      });
    }
  }
}

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    const aiHandler = new AIResponseHandler();

    const handleMessageBoxFocus = (
      event: FocusEvent,
      icon: HTMLImageElement,
      show: boolean
    ): void => {
      const target = event.target as HTMLElement;
      if (
        target.matches(LINKEDIN_SELECTORS.MESSAGE_INPUT) ||
        target.matches(LINKEDIN_SELECTORS.MESSAGE_INPUT_P)
      ) {
        icon.style.display = show ? 'block' : 'none';
      }
    };

    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (
        target.matches(LINKEDIN_SELECTORS.MESSAGE_INPUT) ||
        target.matches(LINKEDIN_SELECTORS.MESSAGE_INPUT_P)
      ) {
        const parentElement = target.closest(LINKEDIN_SELECTORS.CONTAINER) ||
                            target.closest(LINKEDIN_SELECTORS.MESSAGE_INPUT_P);

        if (parentElement && !parentElement.querySelector('.ai-response-icon')) {
          const icon = createAIIcon();
          parentElement.appendChild(icon);

          icon.addEventListener('click', (event) => {
            event.stopPropagation();
            aiHandler.openModal();
          });

          document.addEventListener('focusin', (e) => handleMessageBoxFocus(e, icon, true));
          document.addEventListener('focusout', (e) => handleMessageBoxFocus(e, icon, false));
        }
      }
    });
  },
});