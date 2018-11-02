import { CreateElement, VNode } from 'vue';

interface ObjectDefinition {
  fieldName: string;
  type: string;
  format: string;
  columnSpan?: number;
  label?: string;
  child?: ObjectDefinition[];
}

const componentMap: { [k: string]: string } = {
  div: 'div'
};

export default class Render {
  constructor(private createElement: CreateElement) {}

  render(data: ObjectDefinition[]) {
    const children = new Array<VNode>();
    this.processData(data, children);

    return this.createElement(
      'v-container',
      {
        attrs: {
          'grid-list-md': true
        }
      },
      [
        this.createElement(
          'v-layout',
          {
            attrs: {
              row: true,
              wrap: true
            }
          },
          children
        )
      ]
    );
  }

  private processData(data: ObjectDefinition[] | undefined, children: VNode[]) {
    if (!data) {
      return;
    }
    data.forEach((item) => {
      children.push(this.createNode(item));
    });
  }

  private createNode(data: ObjectDefinition) {
    const children = new Array<VNode>();
    this.processData(data.child, children);

    const attrs: { [k: string]: any } = {};
    data.columnSpan = data.columnSpan || 4;
    attrs[`xs${data.columnSpan}`] = true;

    return this.createElement(
      'v-flex',
      {
        attrs: { ...attrs }
      },
      [
        this.createElement(
          componentMap[data.type],
          children
        )
      ]
    );
  }
}
