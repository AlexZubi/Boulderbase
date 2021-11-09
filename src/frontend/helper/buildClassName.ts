import _ from "lodash";

type ClassNameObject = {
  [key: string]: boolean;
};

type ClassName = string | ClassNameObject | null | undefined;

function normalize(className: string | ClassNameObject | ClassName[]): ClassName[] {
  return _.isArray(className) ? className : [className];
}

function extractClassList(classNameObject: ClassNameObject): string[] {
  return _.chain(classNameObject).pickBy().keys().value();
}

function buildClassList(classNameList: ClassName[]): string[] {
  const cleanList = _.compact(classNameList);

  return _.flatMap(cleanList, (className) =>
    _.isObject(className) ? extractClassList(className) : className
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

  return _.concat(componentName, modifiersList, classNameList).join(" ");
}
