type BaseItem = {
  name: string;
  label: string;
};

type UserWriteInputType = 'text' | 'email' | 'tel';
type UserSelectInputType = 'radio' | 'checkbox';
type BaseInputTagItem = BaseItem & {
  tagName: 'input';
  type: UserWriteInputType | UserSelectInputType;
};

type UserWriteInputItem<T extends UserWriteInputType> = BaseInputTagItem & {
  type: T;
  placeholder: string;
};
type UserSelectInputItem<T extends UserSelectInputType> = BaseInputTagItem & {
  type: T;
  values: { label: string; value: number }[];
};

type TextInputItem = UserWriteInputItem<'text'>;
type EmailInputItem = UserWriteInputItem<'email'>;
type TelInputItem = UserWriteInputItem<'tel'>;
type RadioInputItem = UserSelectInputItem<'radio'>;
type CheckboxInputItem = UserSelectInputItem<'checkbox'>;

type InputTagItem =
  | TextInputItem
  | EmailInputItem
  | TelInputItem
  | RadioInputItem
  | CheckboxInputItem;

type SelectTagItem = BaseItem & {
  tagName: 'select';
  options: { text: string; value: number }[];
};

type TextareaTagItem = BaseItem & {
  tagName: 'textarea';
  placeholder: string;
};

type FormItem = InputTagItem | SelectTagItem | TextareaTagItem;

const items: FormItem[] = [
  {
    name: 'name',
    label: 'お名前',
    tagName: 'input',
    type: 'text',
    placeholder: '例）山田　太郎',
  },
  {
    name: 'email',
    label: 'メールアドレス',
    tagName: 'input',
    type: 'email',
    placeholder: `例）example@gmail.com`,
  },
  {
    name: 'tel',
    label: '電話番号',
    tagName: 'input',
    type: 'tel',
    placeholder: '例）080-1234-5678',
  },
  {
    name: 'address',
    label: 'ご住所',
    tagName: 'input',
    type: 'text',
    placeholder: '例）東京都千代田区丸の内1丁目9-2',
  },
  {
    name: 'contact',
    label: 'ご希望の返信方法',
    tagName: 'input',
    type: 'radio',
    values: [
      { label: 'メール', value: 0 },
      { label: '電話', value: 1 },
      { label: 'どちらでも可', value: 2 },
    ],
  },
  {
    name: 'time',
    label: '連絡可能な時間帯（電話）',
    tagName: 'input',
    type: 'checkbox',
    values: [
      { label: '09:00〜12:00', value: 0 },
      { label: '13:00〜16:00', value: 1 },
      { label: '16:00〜19:00', value: 2 },
    ],
  },
  {
    name: 'inquiry_kind',
    label: 'お問い合せの種類',
    tagName: 'select',
    options: [
      { text: '返品について', value: 0 },
      { text: '発送について', value: 1 },
      { text: 'その他', value: 2 },
    ],
  },
  {
    name: 'inquiry_detail',
    label: 'お問い合せ内容',
    tagName: 'textarea',
    placeholder: '例）お問い合わせ内容詳細をご記入ください',
  },
];

// _____________________________________________________________________________
//

const createInputTag = (item: InputTagItem) => {
  switch (item.type) {
    case 'text':
    case 'email':
    case 'tel':
      return `<input
                type=${item.type}
                name=${item.name}
                placeholder=${item.placeholder}
              />`;
    case 'radio':
    case 'checkbox':
      const name = item.name;
      const type = item.type;
      const inputTags = item.values.map((v) => {
        const id = `${name}${v.value}`;
        return `<input
                  type=${type}
                  name=${name}
                  value=${v.value}
                  id=${id}
                />
                <label for=${id}>
                  ${v.label}
                </label>`;
      });
      return inputTags.join('\n');
    default:
      return;
  }
};

const createSelectTag = (item: SelectTagItem) => {
  const optionStrings = item.options.map(
    (opt) => `<option value=${opt.value}>${opt.text}</option>`
  );
  return `<select name=${item.name}>
            ${optionStrings.join('\n')}
          </select>`;
};

const createTextAreaTag = (item: TextareaTagItem) => {
  return `<textarea name=${item.name} placeholder=${item.placeholder}></textarea>`;
};

function createInputRow(item: InputTagItem) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${createInputTag(item)}
      </td>
    </tr>
  `;
}

function createSelectRow(item: SelectTagItem) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${createSelectTag(item)}
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextareaTagItem) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${createTextAreaTag(item)}
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case 'input':
          return createInputRow(item);
        case 'select':
          return createSelectRow(item);
        case 'textarea':
          return createTextAreaRow(item);
      }
    })
    .join('');
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById('form');
  if (form !== null) {
    form.innerHTML = createTable();
  }
}

createFormDom();
