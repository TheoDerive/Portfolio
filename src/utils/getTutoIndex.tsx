import { TutoPass } from "../type/tutoTypes";

export default function getTutoIndex(index: TutoPass[]) {
  for (let i = 0; i < index.length; i++) {
    const element = index[i];

    if (element.element) {
      return element.element;
    }
  }
}
