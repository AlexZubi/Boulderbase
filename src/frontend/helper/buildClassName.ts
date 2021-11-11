import { isArray, chain, flatMap, isObject, compact, concat } from "lodash"

type ClassNameObject = {
  [key: string]: boolean;
};

type ClassName = string | ClassNameObject | null | undefined;

function normalize(className: string | ClassNameObject | ClassName[]): ClassName[] {
  return isArray(className) ? className : [className];
}

function extractClassList(classNameObject: ClassNameObject): string[] {
  return chain(classNameObject).pickBy().keys().value();
}

function buildClassList(classNameList: ClassName[]): string[] {
  const cleanList = compact(classNameList);

  return flatMap(cleanList, (className) =>
    isObject(className) ? extractClassList(className) : className
  );
}

export default function buildClassName(
  componentName: string,
  modifiers: string | ClassNameObject | ClassName[] = [],
  classNames: string | ClassNameObject | ClassName[] = []
): string {
  const modifiersList = buildClassList(normalize(modifiers)).map(
    (name) => `${componentName}--${name}`
  );
  const classNameList = buildClassList(normalize(classNames));

  return concat(componentName, modifiersList, classNameList).join(" ");
}
