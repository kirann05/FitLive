"use strict";
var FitLiveDomain = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // apps/web/lib/domain.ts
  var domain_exports = {};
  __export(domain_exports, {
    allowed: () => allowed,
    apply: () => apply,
    blank: () => blank,
    coach: () => coach,
    commandSchema: () => commandSchema,
    dateKey: () => dateKey,
    foodSchema: () => foodSchema,
    foods: () => foods,
    forecast: () => forecast,
    groceryList: () => groceryList,
    plan: () => plan,
    progression: () => progression,
    recommendation: () => recommendation,
    recovery: () => recovery,
    scheduledToday: () => scheduledToday,
    seed: () => seed,
    sessionName: () => sessionName,
    totals: () => totals,
    validateSnapshot: () => validateSnapshot
  });

  // apps/web/node_modules/zod/v3/external.js
  var external_exports = {};
  __export(external_exports, {
    BRAND: () => BRAND,
    DIRTY: () => DIRTY,
    EMPTY_PATH: () => EMPTY_PATH,
    INVALID: () => INVALID,
    NEVER: () => NEVER,
    OK: () => OK,
    ParseStatus: () => ParseStatus,
    Schema: () => ZodType,
    ZodAny: () => ZodAny,
    ZodArray: () => ZodArray,
    ZodBigInt: () => ZodBigInt,
    ZodBoolean: () => ZodBoolean,
    ZodBranded: () => ZodBranded,
    ZodCatch: () => ZodCatch,
    ZodDate: () => ZodDate,
    ZodDefault: () => ZodDefault,
    ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
    ZodEffects: () => ZodEffects,
    ZodEnum: () => ZodEnum,
    ZodError: () => ZodError,
    ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
    ZodFunction: () => ZodFunction,
    ZodIntersection: () => ZodIntersection,
    ZodIssueCode: () => ZodIssueCode,
    ZodLazy: () => ZodLazy,
    ZodLiteral: () => ZodLiteral,
    ZodMap: () => ZodMap,
    ZodNaN: () => ZodNaN,
    ZodNativeEnum: () => ZodNativeEnum,
    ZodNever: () => ZodNever,
    ZodNull: () => ZodNull,
    ZodNullable: () => ZodNullable,
    ZodNumber: () => ZodNumber,
    ZodObject: () => ZodObject,
    ZodOptional: () => ZodOptional,
    ZodParsedType: () => ZodParsedType,
    ZodPipeline: () => ZodPipeline,
    ZodPromise: () => ZodPromise,
    ZodReadonly: () => ZodReadonly,
    ZodRecord: () => ZodRecord,
    ZodSchema: () => ZodType,
    ZodSet: () => ZodSet,
    ZodString: () => ZodString,
    ZodSymbol: () => ZodSymbol,
    ZodTransformer: () => ZodEffects,
    ZodTuple: () => ZodTuple,
    ZodType: () => ZodType,
    ZodUndefined: () => ZodUndefined,
    ZodUnion: () => ZodUnion,
    ZodUnknown: () => ZodUnknown,
    ZodVoid: () => ZodVoid,
    addIssueToContext: () => addIssueToContext,
    any: () => anyType,
    array: () => arrayType,
    bigint: () => bigIntType,
    boolean: () => booleanType,
    coerce: () => coerce,
    custom: () => custom,
    date: () => dateType,
    datetimeRegex: () => datetimeRegex,
    defaultErrorMap: () => en_default,
    discriminatedUnion: () => discriminatedUnionType,
    effect: () => effectsType,
    enum: () => enumType,
    function: () => functionType,
    getErrorMap: () => getErrorMap,
    getParsedType: () => getParsedType,
    instanceof: () => instanceOfType,
    intersection: () => intersectionType,
    isAborted: () => isAborted,
    isAsync: () => isAsync,
    isDirty: () => isDirty,
    isValid: () => isValid,
    late: () => late,
    lazy: () => lazyType,
    literal: () => literalType,
    makeIssue: () => makeIssue,
    map: () => mapType,
    nan: () => nanType,
    nativeEnum: () => nativeEnumType,
    never: () => neverType,
    null: () => nullType,
    nullable: () => nullableType,
    number: () => numberType,
    object: () => objectType,
    objectUtil: () => objectUtil,
    oboolean: () => oboolean,
    onumber: () => onumber,
    optional: () => optionalType,
    ostring: () => ostring,
    pipeline: () => pipelineType,
    preprocess: () => preprocessType,
    promise: () => promiseType,
    quotelessJson: () => quotelessJson,
    record: () => recordType,
    set: () => setType,
    setErrorMap: () => setErrorMap,
    strictObject: () => strictObjectType,
    string: () => stringType,
    symbol: () => symbolType,
    transformer: () => effectsType,
    tuple: () => tupleType,
    undefined: () => undefinedType,
    union: () => unionType,
    unknown: () => unknownType,
    util: () => util,
    void: () => voidType
  });

  // apps/web/node_modules/zod/v3/helpers/util.js
  var util;
  (function(util2) {
    util2.assertEqual = (_) => {
    };
    function assertIs(_arg) {
    }
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error();
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = (items) => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = (obj) => {
      const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
      const filtered = {};
      for (const k of validKeys) {
        filtered[k] = obj[k];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = (obj) => {
      return util2.objectKeys(obj).map(function(e) {
        return obj[e];
      });
    };
    util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item))
          return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
        // second overwrites first
      };
    };
  })(objectUtil || (objectUtil = {}));
  var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  var getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
      case "undefined":
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "symbol":
        return ZodParsedType.symbol;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };

  // apps/web/node_modules/zod/v3/ZodError.js
  var ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]);
  var quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
  };
  var ZodError = class _ZodError extends Error {
    get errors() {
      return this.issues;
    }
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = (sub) => {
        this.issues = [...this.issues, sub];
      };
      this.addIssues = (subs = []) => {
        this.issues = [...this.issues, ...subs];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = { _errors: [] };
      const processError = (error) => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i = 0;
            while (i < issue.path.length) {
              const el = issue.path[i];
              const terminal = i === issue.path.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || { _errors: [] };
              } else {
                curr[el] = curr[el] || { _errors: [] };
                curr[el]._errors.push(mapper(issue));
              }
              curr = curr[el];
              i++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    static assert(value) {
      if (!(value instanceof _ZodError)) {
        throw new Error(`Not a ZodError: ${value}`);
      }
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          const firstEl = sub.path[0];
          fieldErrors[firstEl] = fieldErrors[firstEl] || [];
          fieldErrors[firstEl].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return { formErrors, fieldErrors };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
  };

  // apps/web/node_modules/zod/v3/locales/en.js
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("includes" in issue.validation) {
            message = `Invalid input: must include "${issue.validation.includes}"`;
            if (typeof issue.validation.position === "number") {
              message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
            }
          } else if ("startsWith" in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ("endsWith" in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
        else if (issue.type === "bigint")
          message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.too_big:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "bigint")
          message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      case ZodIssueCode.not_finite:
        message = "Number must be finite";
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  var en_default = errorMap;

  // apps/web/node_modules/zod/v3/errors.js
  var overrideErrorMap = en_default;
  function setErrorMap(map) {
    overrideErrorMap = map;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }

  // apps/web/node_modules/zod/v3/helpers/parseUtil.js
  var makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...issueData.path || []];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    if (issueData.message !== void 0) {
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message
      };
    }
    let errorMessage = "";
    const maps = errorMaps.filter((m) => !!m).slice().reverse();
    for (const map of maps) {
      errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: errorMessage
    };
  };
  var EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        // contextual error map is first priority
        ctx.schemaErrorMap,
        // then schema-bound map if available
        overrideMap,
        // then global override map
        overrideMap === en_default ? void 0 : en_default
        // then global default map
      ].filter((x) => !!x)
    });
    ctx.common.issues.push(issue);
  }
  var ParseStatus = class _ParseStatus {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid")
        this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted")
        this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s of results) {
        if (s.status === "aborted")
          return INVALID;
        if (s.status === "dirty")
          status.dirty();
        arrayValue.push(s.value);
      }
      return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        const key = await pair.key;
        const value = await pair.value;
        syncPairs.push({
          key,
          value
        });
      }
      return _ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const { key, value } = pair;
        if (key.status === "aborted")
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
        if (key.status === "dirty")
          status.dirty();
        if (value.status === "dirty")
          status.dirty();
        if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
          finalObject[key.value] = value.value;
        }
      }
      return { status: status.value, value: finalObject };
    }
  };
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var DIRTY = (value) => ({ status: "dirty", value });
  var OK = (value) => ({ status: "valid", value });
  var isAborted = (x) => x.status === "aborted";
  var isDirty = (x) => x.status === "dirty";
  var isValid = (x) => x.status === "valid";
  var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

  // apps/web/node_modules/zod/v3/helpers/errorUtil.js
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
  })(errorUtil || (errorUtil = {}));

  // apps/web/node_modules/zod/v3/types.js
  var ParseInputLazyPath = class {
    constructor(parent, value, path, key) {
      this._cachedPath = [];
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      if (!this._cachedPath.length) {
        if (Array.isArray(this._key)) {
          this._cachedPath.push(...this._path, ...this._key);
        } else {
          this._cachedPath.push(...this._path, this._key);
        }
      }
      return this._cachedPath;
    }
  };
  var handleResult = (ctx, result) => {
    if (isValid(result)) {
      return { success: true, data: result.value };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      return {
        success: false,
        get error() {
          if (this._error)
            return this._error;
          const error = new ZodError(ctx.common.issues);
          this._error = error;
          return this._error;
        }
      };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
    const customMap = (iss, ctx) => {
      const { message } = params;
      if (iss.code === "invalid_enum_value") {
        return { message: message ?? ctx.defaultError };
      }
      if (typeof ctx.data === "undefined") {
        return { message: message ?? required_error ?? ctx.defaultError };
      }
      if (iss.code !== "invalid_type")
        return { message: ctx.defaultError };
      return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
  }
  var ZodType = class {
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result;
    }
    _parseAsync(input) {
      const result = this._parse(input);
      return Promise.resolve(result);
    }
    parse(data, params) {
      const result = this.safeParse(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    safeParse(data, params) {
      const ctx = {
        common: {
          issues: [],
          async: params?.async ?? false,
          contextualErrorMap: params?.errorMap
        },
        path: params?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result = this._parseSync({ data, path: ctx.path, parent: ctx });
      return handleResult(ctx, result);
    }
    "~validate"(data) {
      const ctx = {
        common: {
          issues: [],
          async: !!this["~standard"].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      if (!this["~standard"].async) {
        try {
          const result = this._parseSync({ data, path: [], parent: ctx });
          return isValid(result) ? {
            value: result.value
          } : {
            issues: ctx.common.issues
          };
        } catch (err) {
          if (err?.message?.toLowerCase()?.includes("encountered")) {
            this["~standard"].async = true;
          }
          ctx.common = {
            issues: [],
            async: true
          };
        }
      }
      return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
        value: result.value
      } : {
        issues: ctx.common.issues
      });
    }
    async parseAsync(data, params) {
      const result = await this.safeParseAsync(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params?.errorMap,
          async: true
        },
        path: params?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
      const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
      return handleResult(ctx, result);
    }
    refine(check, message) {
      const getIssueProperties = (val) => {
        if (typeof message === "string" || typeof message === "undefined") {
          return { message };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result instanceof Promise) {
          return result.then((data) => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement }
      });
    }
    superRefine(refinement) {
      return this._refinement(refinement);
    }
    constructor(def) {
      this.spa = this.safeParseAsync;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.brand = this.brand.bind(this);
      this.default = this.default.bind(this);
      this.catch = this.catch.bind(this);
      this.describe = this.describe.bind(this);
      this.pipe = this.pipe.bind(this);
      this.readonly = this.readonly.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
      this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: (data) => this["~validate"](data)
      };
    }
    optional() {
      return ZodOptional.create(this, this._def);
    }
    nullable() {
      return ZodNullable.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ZodArray.create(this);
    }
    promise() {
      return ZodPromise.create(this, this._def);
    }
    or(option) {
      return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
      return new ZodEffects({
        ...processCreateParams(this._def),
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        ...processCreateParams(this._def),
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(this._def)
      });
    }
    catch(def) {
      const catchValueFunc = typeof def === "function" ? def : () => def;
      return new ZodCatch({
        ...processCreateParams(this._def),
        innerType: this,
        catchValue: catchValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodCatch
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    pipe(target) {
      return ZodPipeline.create(this, target);
    }
    readonly() {
      return ZodReadonly.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  var cuidRegex = /^c[^\s-]{8,}$/i;
  var cuid2Regex = /^[0-9a-z]+$/;
  var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
  var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
  var nanoidRegex = /^[a-z0-9_-]{21}$/i;
  var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
  var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
  var emojiRegex;
  var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
  var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
  var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
  var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
  var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
  var dateRegex = new RegExp(`^${dateRegexSource}$`);
  function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
      secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    } else if (args.precision == null) {
      secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
  }
  function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
  }
  function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
      opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
  }
  function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
      return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
      return true;
    }
    return false;
  }
  function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
      return false;
    try {
      const [header] = jwt.split(".");
      if (!header)
        return false;
      const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
      const decoded = JSON.parse(atob(base64));
      if (typeof decoded !== "object" || decoded === null)
        return false;
      if ("typ" in decoded && decoded?.typ !== "JWT")
        return false;
      if (!decoded.alg)
        return false;
      if (alg && decoded.alg !== alg)
        return false;
      return true;
    } catch {
      return false;
    }
  }
  function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
      return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
      return true;
    }
    return false;
  }
  var ZodString = class _ZodString extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = String(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "length") {
          const tooBig = input.data.length > check.value;
          const tooSmall = input.data.length < check.value;
          if (tooBig || tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            if (tooBig) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            } else if (tooSmall) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            }
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "emoji") {
          if (!emojiRegex) {
            emojiRegex = new RegExp(_emojiRegex, "u");
          }
          if (!emojiRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "nanoid") {
          if (!nanoidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "nanoid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid2") {
          if (!cuid2Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid2",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ulid") {
          if (!ulidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ulid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "includes") {
          if (!input.data.includes(check.value, check.position)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { includes: check.value, position: check.position },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "toLowerCase") {
          input.data = input.data.toLowerCase();
        } else if (check.kind === "toUpperCase") {
          input.data = input.data.toUpperCase();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "datetime") {
          const regex = datetimeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "datetime",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "date") {
          const regex = dateRegex;
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "date",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "time") {
          const regex = timeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "time",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "duration") {
          if (!durationRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "duration",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ip") {
          if (!isValidIP(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "jwt") {
          if (!isValidJWT(input.data, check.alg)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "jwt",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cidr") {
          if (!isValidCidr(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cidr",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64") {
          if (!base64Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64url") {
          if (!base64urlRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
      return this.refinement((data) => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
    }
    _addCheck(check) {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    email(message) {
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
      return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
      return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
      return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
      return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
      return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
      return this._addCheck({
        kind: "base64url",
        ...errorUtil.errToObj(message)
      });
    }
    jwt(options) {
      return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
      return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
      return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "datetime",
          precision: null,
          offset: false,
          local: false,
          message: options
        });
      }
      return this._addCheck({
        kind: "datetime",
        precision: typeof options?.precision === "undefined" ? null : options?.precision,
        offset: options?.offset ?? false,
        local: options?.local ?? false,
        ...errorUtil.errToObj(options?.message)
      });
    }
    date(message) {
      return this._addCheck({ kind: "date", message });
    }
    time(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "time",
          precision: null,
          message: options
        });
      }
      return this._addCheck({
        kind: "time",
        precision: typeof options?.precision === "undefined" ? null : options?.precision,
        ...errorUtil.errToObj(options?.message)
      });
    }
    duration(message) {
      return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    includes(value, options) {
      return this._addCheck({
        kind: "includes",
        value,
        position: options?.position,
        ...errorUtil.errToObj(options?.message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this._addCheck({
        kind: "length",
        value: len,
        ...errorUtil.errToObj(message)
      });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
      return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodString.create = (params) => {
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      coerce: params?.coerce ?? false,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / 10 ** decCount;
  }
  var ZodNumber = class _ZodNumber extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = Number(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "finite") {
          if (!Number.isFinite(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_finite,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodNumber({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new _ZodNumber({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    finite(message) {
      return this._addCheck({
        kind: "finite",
        message: errorUtil.toString(message)
      });
    }
    safe(message) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: errorUtil.toString(message)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
    }
    get isFinite() {
      let max = null;
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
          return true;
        } else if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        } else if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return Number.isFinite(min) && Number.isFinite(max);
    }
  };
  ZodNumber.create = (params) => {
    return new ZodNumber({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodNumber,
      coerce: params?.coerce || false,
      ...processCreateParams(params)
    });
  };
  var ZodBigInt = class _ZodBigInt extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
    }
    _parse(input) {
      if (this._def.coerce) {
        try {
          input.data = BigInt(input.data);
        } catch {
          return this._getInvalidInput(input);
        }
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        return this._getInvalidInput(input);
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              type: "bigint",
              minimum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              type: "bigint",
              maximum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (input.data % check.value !== BigInt(0)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx.parsedType
      });
      return INVALID;
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodBigInt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new _ZodBigInt({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodBigInt.create = (params) => {
    return new ZodBigInt({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      coerce: params?.coerce ?? false,
      ...processCreateParams(params)
    });
  };
  var ZodBoolean = class extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = Boolean(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBoolean.create = (params) => {
    return new ZodBoolean({
      typeName: ZodFirstPartyTypeKind.ZodBoolean,
      coerce: params?.coerce || false,
      ...processCreateParams(params)
    });
  };
  var ZodDate = class _ZodDate extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = new Date(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (Number.isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              exact: false,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              exact: false,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new _ZodDate({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  };
  ZodDate.create = (params) => {
    return new ZodDate({
      checks: [],
      coerce: params?.coerce || false,
      typeName: ZodFirstPartyTypeKind.ZodDate,
      ...processCreateParams(params)
    });
  };
  var ZodSymbol = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.symbol) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodSymbol.create = (params) => {
    return new ZodSymbol({
      typeName: ZodFirstPartyTypeKind.ZodSymbol,
      ...processCreateParams(params)
    });
  };
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodNull.create = (params) => {
    return new ZodNull({
      typeName: ZodFirstPartyTypeKind.ZodNull,
      ...processCreateParams(params)
    });
  };
  var ZodAny = class extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodAny.create = (params) => {
    return new ZodAny({
      typeName: ZodFirstPartyTypeKind.ZodAny,
      ...processCreateParams(params)
    });
  };
  var ZodUnknown = class extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodVoid.create = (params) => {
    return new ZodVoid({
      typeName: ZodFirstPartyTypeKind.ZodVoid,
      ...processCreateParams(params)
    });
  };
  var ZodArray = class _ZodArray extends ZodType {
    _parse(input) {
      const { ctx, status } = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.exactLength !== null) {
        const tooBig = ctx.data.length > def.exactLength.value;
        const tooSmall = ctx.data.length < def.exactLength.value;
        if (tooBig || tooSmall) {
          addIssueToContext(ctx, {
            code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
            minimum: tooSmall ? def.exactLength.value : void 0,
            maximum: tooBig ? def.exactLength.value : void 0,
            type: "array",
            inclusive: true,
            exact: true,
            message: def.exactLength.message
          });
          status.dirty();
        }
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all([...ctx.data].map((item, i) => {
          return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        })).then((result2) => {
          return ParseStatus.mergeArray(status, result2);
        });
      }
      const result = [...ctx.data].map((item, i) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      });
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new _ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new _ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return new _ZodArray({
        ...this._def,
        exactLength: { value: len, message: errorUtil.toString(message) }
      });
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodArray.create = (schema, params) => {
    return new ZodArray({
      type: schema,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: ZodFirstPartyTypeKind.ZodArray,
      ...processCreateParams(params)
    });
  };
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return new ZodArray({
        ...schema._def,
        type: deepPartialify(schema.element)
      });
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  var ZodObject = class _ZodObject extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      this._cached = { shape, keys };
      return this._cached;
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const { status, ctx } = this._processInputParams(input);
      const { shape, keys: shapeKeys } = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: { status: "valid", value: key },
              value: { status: "valid", value: ctx.data[key] }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip") {
        } else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: catchall._parse(
              new ParseInputLazyPath(ctx, value, ctx.path, key)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then((syncPairs) => {
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: errorUtil.errToObj(message).message ?? defaultError
              };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
      return new _ZodObject({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...augmentation
        })
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
      const merged = new _ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...merging._def.shape()
        }),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
      return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
      return new _ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      for (const key of util.objectKeys(mask)) {
        if (mask[key] && this.shape[key]) {
          shape[key] = this.shape[key];
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      for (const key of util.objectKeys(this.shape)) {
        if (!mask[key]) {
          shape[key] = this.shape[key];
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      for (const key of util.objectKeys(this.shape)) {
        const fieldSchema = this.shape[key];
        if (mask && !mask[key]) {
          newShape[key] = fieldSchema;
        } else {
          newShape[key] = fieldSchema.optional();
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required(mask) {
      const newShape = {};
      for (const key of util.objectKeys(this.shape)) {
        if (mask && !mask[key]) {
          newShape[key] = this.shape[key];
        } else {
          const fieldSchema = this.shape[key];
          let newField = fieldSchema;
          while (newField instanceof ZodOptional) {
            newField = newField._def.innerType;
          }
          newShape[key] = newField;
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
  ZodObject.create = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
      shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  var ZodUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result of results) {
          if (result.result.status === "valid") {
            return result.result;
          }
        }
        for (const result of results) {
          if (result.result.status === "dirty") {
            ctx.common.issues.push(...result.ctx.common.issues);
            return result.result;
          }
        }
        const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result.status === "valid") {
            return result;
          } else if (result.status === "dirty" && !dirty) {
            dirty = { result, ctx: childCtx };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  ZodUnion.create = (types, params) => {
    return new ZodUnion({
      options: types,
      typeName: ZodFirstPartyTypeKind.ZodUnion,
      ...processCreateParams(params)
    });
  };
  var getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
      return getDiscriminator(type.schema);
    } else if (type instanceof ZodEffects) {
      return getDiscriminator(type.innerType());
    } else if (type instanceof ZodLiteral) {
      return [type.value];
    } else if (type instanceof ZodEnum) {
      return type.options;
    } else if (type instanceof ZodNativeEnum) {
      return util.objectValues(type.enum);
    } else if (type instanceof ZodDefault) {
      return getDiscriminator(type._def.innerType);
    } else if (type instanceof ZodUndefined) {
      return [void 0];
    } else if (type instanceof ZodNull) {
      return [null];
    } else if (type instanceof ZodOptional) {
      return [void 0, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodNullable) {
      return [null, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodBranded) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodReadonly) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodCatch) {
      return getDiscriminator(type._def.innerType);
    } else {
      return [];
    }
  };
  var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.optionsMap.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [discriminator]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
      const optionsMap = /* @__PURE__ */ new Map();
      for (const type of options) {
        const discriminatorValues = getDiscriminator(type.shape[discriminator]);
        if (!discriminatorValues.length) {
          throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
        }
        for (const value of discriminatorValues) {
          if (optionsMap.has(value)) {
            throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
          }
          optionsMap.set(value, type);
        }
      }
      return new _ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        optionsMap,
        ...processCreateParams(params)
      });
    }
  };
  function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
      return { valid: true, data: a };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b);
      const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a, ...b };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a[key], b[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a.length !== b.length) {
        return { valid: false };
      }
      const newArray = [];
      for (let index = 0; index < a.length; index++) {
        const itemA = a[index];
        const itemB = b[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
      return { valid: true, data: a };
    } else {
      return { valid: false };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return { status: status.value, value: merged.data };
      };
      if (ctx.common.async) {
        return Promise.all([
          this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }),
          this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })
        ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  };
  ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
      left,
      right,
      typeName: ZodFirstPartyTypeKind.ZodIntersection,
      ...processCreateParams(params)
    });
  };
  var ZodTuple = class _ZodTuple extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        status.dirty();
      }
      const items = [...ctx.data].map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema)
          return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter((x) => !!x);
      if (ctx.common.async) {
        return Promise.all(items).then((results) => {
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new _ZodTuple({
        ...this._def,
        rest
      });
    }
  };
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  var ZodRecord = class _ZodRecord extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new _ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new _ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  };
  var ZodMap = class extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [...ctx.data.entries()].map(([key, value], index) => {
        return {
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
          value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
        };
      });
      if (ctx.common.async) {
        const finalMap = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        });
      } else {
        const finalMap = /* @__PURE__ */ new Map();
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }
    }
  };
  ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
      valueType,
      keyType,
      typeName: ZodFirstPartyTypeKind.ZodMap,
      ...processCreateParams(params)
    });
  };
  var ZodSet = class _ZodSet extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet = /* @__PURE__ */ new Set();
        for (const element of elements2) {
          if (element.status === "aborted")
            return INVALID;
          if (element.status === "dirty")
            status.dirty();
          parsedSet.add(element.value);
        }
        return { status: status.value, value: parsedSet };
      }
      const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
      if (ctx.common.async) {
        return Promise.all(elements).then((elements2) => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new _ZodSet({
        ...this._def,
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new _ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodSet.create = (valueType, params) => {
    return new ZodSet({
      valueType,
      minSize: null,
      maxSize: null,
      typeName: ZodFirstPartyTypeKind.ZodSet,
      ...processCreateParams(params)
    });
  };
  var ZodFunction = class _ZodFunction extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        const me = this;
        return OK(async function(...args) {
          const error = new ZodError([]);
          const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
            error.addIssue(makeArgsIssue(args, e));
            throw error;
          });
          const result = await Reflect.apply(fn, this, parsedArgs);
          const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
            error.addIssue(makeReturnsIssue(result, e));
            throw error;
          });
          return parsedReturns;
        });
      } else {
        const me = this;
        return OK(function(...args) {
          const parsedArgs = me._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result = Reflect.apply(fn, this, parsedArgs.data);
          const parsedReturns = me._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new _ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new _ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new _ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  };
  var ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
  };
  ZodLazy.create = (getter, params) => {
    return new ZodLazy({
      getter,
      typeName: ZodFirstPartyTypeKind.ZodLazy,
      ...processCreateParams(params)
    });
  };
  var ZodLiteral = class extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  };
  ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
      value,
      typeName: ZodFirstPartyTypeKind.ZodLiteral,
      ...processCreateParams(params)
    });
  };
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  var ZodEnum = class _ZodEnum extends ZodType {
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!this._cache) {
        this._cache = new Set(this._def.values);
      }
      if (!this._cache.has(input.data)) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    extract(values, newDef = this._def) {
      return _ZodEnum.create(values, {
        ...this._def,
        ...newDef
      });
    }
    exclude(values, newDef = this._def) {
      return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
        ...this._def,
        ...newDef
      });
    }
  };
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!this._cache) {
        this._cache = new Set(util.getValidEnumValues(this._def.values));
      }
      if (!this._cache.has(input.data)) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(params)
    });
  };
  var ZodPromise = class extends ZodType {
    unwrap() {
      return this._def.type;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  };
  ZodPromise.create = (schema, params) => {
    return new ZodPromise({
      type: schema,
      typeName: ZodFirstPartyTypeKind.ZodPromise,
      ...processCreateParams(params)
    });
  };
  var ZodEffects = class extends ZodType {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const effect = this._def.effect || null;
      const checkCtx = {
        addIssue: (arg) => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(processed).then(async (processed2) => {
            if (status.value === "aborted")
              return INVALID;
            const result = await this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          });
        } else {
          if (status.value === "aborted")
            return INVALID;
          const result = this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        }
      }
      if (effect.type === "refinement") {
        const executeRefinement = (acc) => {
          const result = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result);
          }
          if (result instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base))
            return INVALID;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return INVALID;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
              status: status.value,
              value: result
            }));
          });
        }
      }
      util.assertNever(effect);
    }
  };
  ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
      schema,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect,
      ...processCreateParams(params)
    });
  };
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
      schema,
      effect: { type: "preprocess", transform: preprocess },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(params)
    });
  };
  var ZodOptional = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodOptional.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNullable = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodNullable.create = (type, params) => {
    return new ZodNullable({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodNullable,
      ...processCreateParams(params)
    });
  };
  var ZodDefault = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ZodDefault.create = (type, params) => {
    return new ZodDefault({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodDefault,
      defaultValue: typeof params.default === "function" ? params.default : () => params.default,
      ...processCreateParams(params)
    });
  };
  var ZodCatch = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const newCtx = {
        ...ctx,
        common: {
          ...ctx.common,
          issues: []
        }
      };
      const result = this._def.innerType._parse({
        data: newCtx.data,
        path: newCtx.path,
        parent: {
          ...newCtx
        }
      });
      if (isAsync(result)) {
        return result.then((result2) => {
          return {
            status: "valid",
            value: result2.status === "valid" ? result2.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        });
      } else {
        return {
          status: "valid",
          value: result.status === "valid" ? result.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      }
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  ZodCatch.create = (type, params) => {
    return new ZodCatch({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodCatch,
      catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
      ...processCreateParams(params)
    });
  };
  var ZodNaN = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  };
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  var BRAND = /* @__PURE__ */ Symbol("zod_brand");
  var ZodBranded = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  var ZodPipeline = class _ZodPipeline extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.common.async) {
        const handleAsync = async () => {
          const inResult = await this._def.in._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return DIRTY(inResult.value);
          } else {
            return this._def.out._parseAsync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        };
        return handleAsync();
      } else {
        const inResult = this._def.in._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return {
            status: "dirty",
            value: inResult.value
          };
        } else {
          return this._def.out._parseSync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }
    }
    static create(a, b) {
      return new _ZodPipeline({
        in: a,
        out: b,
        typeName: ZodFirstPartyTypeKind.ZodPipeline
      });
    }
  };
  var ZodReadonly = class extends ZodType {
    _parse(input) {
      const result = this._def.innerType._parse(input);
      const freeze = (data) => {
        if (isValid(data)) {
          data.value = Object.freeze(data.value);
        }
        return data;
      };
      return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodReadonly,
      ...processCreateParams(params)
    });
  };
  function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
  }
  function custom(check, _params = {}, fatal) {
    if (check)
      return ZodAny.create().superRefine((data, ctx) => {
        const r = check(data);
        if (r instanceof Promise) {
          return r.then((r2) => {
            if (!r2) {
              const params = cleanParams(_params, data);
              const _fatal = params.fatal ?? fatal ?? true;
              ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
          });
        }
        if (!r) {
          const params = cleanParams(_params, data);
          const _fatal = params.fatal ?? fatal ?? true;
          ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
        }
        return;
      });
    return ZodAny.create();
  }
  var late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom((data) => data instanceof cls, params);
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var symbolType = ZodSymbol.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;
  var pipelineType = ZodPipeline.create;
  var ostring = () => stringType().optional();
  var onumber = () => numberType().optional();
  var oboolean = () => booleanType().optional();
  var coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
      ...arg,
      coerce: true
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
  };
  var NEVER = INVALID;

  // apps/web/lib/exercises/vendor/catalogue.json
  var catalogue_default = [
    {
      id: "fedb:3_4_Sit-Up",
      name: "3/4 Sit-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:90_90_Hamstring",
      name: "90/90 Hamstring",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Ab_Crunch_Machine",
      name: "Ab Crunch Machine",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Ab_Roller",
      name: "Ab Roller",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Adductor",
      name: "Adductor",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Adductor_Groin",
      name: "Adductor/Groin",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Advanced_Kettlebell_Windmill",
      name: "Advanced Kettlebell Windmill",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Air_Bike",
      name: "Air Bike",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:All_Fours_Quad_Stretch",
      name: "All Fours Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Alternate_Hammer_Curl",
      name: "Alternate Hammer Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Alternate_Heel_Touchers",
      name: "Alternate Heel Touchers",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternate_Incline_Dumbbell_Curl",
      name: "Alternate Incline Dumbbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Alternate_Leg_Diagonal_Bound",
      name: "Alternate Leg Diagonal Bound",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Cable_Shoulder_Press",
      name: "Alternating Cable Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Deltoid_Raise",
      name: "Alternating Deltoid Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Floor_Press",
      name: "Alternating Floor Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Hang_Clean",
      name: "Alternating Hang Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Biceps",
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Kettlebell_Press",
      name: "Alternating Kettlebell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Kettlebell_Row",
      name: "Alternating Kettlebell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Alternating_Renegade_Row",
      name: "Alternating Renegade Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Chest",
        "Back",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Ankle_Circles",
      name: "Ankle Circles",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Ankle_On_The_Knee",
      name: "Ankle On The Knee",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Anterior_Tibialis-SMR",
      name: "Anterior Tibialis-SMR",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Anti-Gravity_Press",
      name: "Anti-Gravity Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Arm_Circles",
      name: "Arm Circles",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Arnold_Dumbbell_Press",
      name: "Arnold Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Around_The_Worlds",
      name: "Around The Worlds",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Atlas_Stone_Trainer",
      name: "Atlas Stone Trainer",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Atlas_Stones",
      name: "Atlas Stones",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Quads",
        "Biceps",
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Axle_Deadlift",
      name: "Axle Deadlift",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Back_Flyes_-_With_Bands",
      name: "Back Flyes - With Bands",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Triceps"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Backward_Drag",
      name: "Backward Drag",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Backward_Medicine_Ball_Throw",
      name: "Backward Medicine Ball Throw",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Balance_Board",
      name: "Balance Board",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Ball_Leg_Curl",
      name: "Ball Leg Curl",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Assisted_Pull-Up",
      name: "Band Assisted Pull-Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Forearms",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Good_Morning",
      name: "Band Good Morning",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Good_Morning_Pull_Through",
      name: "Band Good Morning (Pull Through)",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Hip_Adductions",
      name: "Band Hip Adductions",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Pull_Apart",
      name: "Band Pull Apart",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Band_Skull_Crusher",
      name: "Band Skull Crusher",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Ab_Rollout",
      name: "Barbell Ab Rollout",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Ab_Rollout_-_On_Knees",
      name: "Barbell Ab Rollout - On Knees",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Bench_Press_-_Medium_Grip",
      name: "Barbell Bench Press - Medium Grip",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Curl",
      name: "Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Curls_Lying_Against_An_Incline",
      name: "Barbell Curls Lying Against An Incline",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Deadlift",
      name: "Barbell Deadlift",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Full_Squat",
      name: "Barbell Full Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Glute_Bridge",
      name: "Barbell Glute Bridge",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Guillotine_Bench_Press",
      name: "Barbell Guillotine Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Hack_Squat",
      name: "Barbell Hack Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Hip_Thrust",
      name: "Barbell Hip Thrust",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Incline_Bench_Press_-_Medium_Grip",
      name: "Barbell Incline Bench Press - Medium Grip",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Incline_Shoulder_Raise",
      name: "Barbell Incline Shoulder Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Lunge",
      name: "Barbell Lunge",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Rear_Delt_Row",
      name: "Barbell Rear Delt Row",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Rollout_from_Bench",
      name: "Barbell Rollout from Bench",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Seated_Calf_Raise",
      name: "Barbell Seated Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Shoulder_Press",
      name: "Barbell Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Shrug",
      name: "Barbell Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Shrug_Behind_The_Back",
      name: "Barbell Shrug Behind The Back",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Side_Bend",
      name: "Barbell Side Bend",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Side_Split_Squat",
      name: "Barbell Side Split Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Squat",
      name: "Barbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Squat_To_A_Bench",
      name: "Barbell Squat To A Bench",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Step_Ups",
      name: "Barbell Step Ups",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Barbell_Walking_Lunge",
      name: "Barbell Walking Lunge",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Battling_Ropes",
      name: "Battling Ropes",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bear_Crawl_Sled_Drags",
      name: "Bear Crawl Sled Drags",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Behind_Head_Chest_Stretch",
      name: "Behind Head Chest Stretch",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Bench_Dips",
      name: "Bench Dips",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bench_Jump",
      name: "Bench Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bench_Press_-_Powerlifting",
      name: "Bench Press - Powerlifting",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bench_Press_-_With_Bands",
      name: "Bench Press - With Bands",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bench_Press_with_Chains",
      name: "Bench Press with Chains",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bench_Sprint",
      name: "Bench Sprint",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent-Arm_Barbell_Pullover",
      name: "Bent-Arm Barbell Pullover",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Chest",
        "Back",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent-Arm_Dumbbell_Pullover",
      name: "Bent-Arm Dumbbell Pullover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Bent-Knee_Hip_Raise",
      name: "Bent-Knee Hip Raise",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Barbell_Row",
      name: "Bent Over Barbell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
      name: "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Low-Pulley_Side_Lateral",
      name: "Bent Over Low-Pulley Side Lateral",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Back",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_One-Arm_Long_Bar_Row",
      name: "Bent Over One-Arm Long Bar Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Two-Arm_Long_Bar_Row",
      name: "Bent Over Two-Arm Long Bar Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Two-Dumbbell_Row",
      name: "Bent Over Two-Dumbbell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Over_Two-Dumbbell_Row_With_Palms_In",
      name: "Bent Over Two-Dumbbell Row With Palms In",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Bent_Press",
      name: "Bent Press",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bicycling",
      name: "Bicycling",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Bicycling_Stationary",
      name: "Bicycling, Stationary",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Board_Press",
      name: "Board Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Body-Up",
      name: "Body-Up",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Core",
        "Forearms"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Body_Tricep_Press",
      name: "Body Tricep Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bodyweight_Flyes",
      name: "Bodyweight Flyes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bodyweight_Mid_Row",
      name: "Bodyweight Mid Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bodyweight_Squat",
      name: "Bodyweight Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bodyweight_Walking_Lunge",
      name: "Bodyweight Walking Lunge",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bosu_Ball_Cable_Crunch_With_Side_Bends",
      name: "Bosu Ball Cable Crunch With Side Bends",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bottoms-Up_Clean_From_The_Hang_Position",
      name: "Bottoms-Up Clean From The Hang Position",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [
        "Biceps",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Bottoms_Up",
      name: "Bottoms Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Box_Jump_Multiple_Response",
      name: "Box Jump (Multiple Response)",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Box_Skip",
      name: "Box Skip",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Box_Squat",
      name: "Box Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Box_Squat_with_Bands",
      name: "Box Squat with Bands",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Box_Squat_with_Chains",
      name: "Box Squat with Chains",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Brachialis-SMR",
      name: "Brachialis-SMR",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Bradford_Rocky_Presses",
      name: "Bradford/Rocky Presses",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Butt-Ups",
      name: "Butt-Ups",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Butt_Lift_Bridge",
      name: "Butt Lift (Bridge)",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Butterfly",
      name: "Butterfly",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Chest_Press",
      name: "Cable Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Crossover",
      name: "Cable Crossover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Crunch",
      name: "Cable Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Deadlifts",
      name: "Cable Deadlifts",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Hammer_Curls_-_Rope_Attachment",
      name: "Cable Hammer Curls - Rope Attachment",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Hip_Adduction",
      name: "Cable Hip Adduction",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Incline_Pushdown",
      name: "Cable Incline Pushdown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Incline_Triceps_Extension",
      name: "Cable Incline Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Internal_Rotation",
      name: "Cable Internal Rotation",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Iron_Cross",
      name: "Cable Iron Cross",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Judo_Flip",
      name: "Cable Judo Flip",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Lying_Triceps_Extension",
      name: "Cable Lying Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_One_Arm_Tricep_Extension",
      name: "Cable One Arm Tricep Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Preacher_Curl",
      name: "Cable Preacher Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Rear_Delt_Fly",
      name: "Cable Rear Delt Fly",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Reverse_Crunch",
      name: "Cable Reverse Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Rope_Overhead_Triceps_Extension",
      name: "Cable Rope Overhead Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Rope_Rear-Delt_Rows",
      name: "Cable Rope Rear-Delt Rows",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Russian_Twists",
      name: "Cable Russian Twists",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Seated_Crunch",
      name: "Cable Seated Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Seated_Lateral_Raise",
      name: "Cable Seated Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Shoulder_Press",
      name: "Cable Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Shrugs",
      name: "Cable Shrugs",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cable_Wrist_Curl",
      name: "Cable Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Calf-Machine_Shoulder_Shrug",
      name: "Calf-Machine Shoulder Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Calf_Press",
      name: "Calf Press",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Calf_Press_On_The_Leg_Press_Machine",
      name: "Calf Press On The Leg Press Machine",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Calf_Raise_On_A_Dumbbell",
      name: "Calf Raise On A Dumbbell",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Calf_Raises_-_With_Bands",
      name: "Calf Raises - With Bands",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Calf_Stretch_Elbows_Against_Wall",
      name: "Calf Stretch Elbows Against Wall",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Calf_Stretch_Hands_Against_Wall",
      name: "Calf Stretch Hands Against Wall",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Calves-SMR",
      name: "Calves-SMR",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Car_Deadlift",
      name: "Car Deadlift",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Car_Drivers",
      name: "Car Drivers",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Carioca_Quick_Step",
      name: "Carioca Quick Step",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cat_Stretch",
      name: "Cat Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Catch_and_Overhead_Throw",
      name: "Catch and Overhead Throw",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chain_Handle_Extension",
      name: "Chain Handle Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chain_Press",
      name: "Chain Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chair_Leg_Extended_Stretch",
      name: "Chair Leg Extended Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Chair_Lower_Back_Stretch",
      name: "Chair Lower Back Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Chair_Squat",
      name: "Chair Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chair_Upper_Body_Stretch",
      name: "Chair Upper Body Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Chest"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Chest_And_Front_Of_Shoulder_Stretch",
      name: "Chest And Front Of Shoulder Stretch",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Chest_Push_from_3_point_stance",
      name: "Chest Push from 3 point stance",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chest_Push_multiple_response",
      name: "Chest Push (multiple response)",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chest_Push_single_response",
      name: "Chest Push (single response)",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chest_Push_with_Run_Release",
      name: "Chest Push with Run Release",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chest_Stretch_on_Stability_Ball",
      name: "Chest Stretch on Stability Ball",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Childs_Pose",
      name: "Child's Pose",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Chin-Up",
      name: "Chin-Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Chin_To_Chest_Stretch",
      name: "Chin To Chest Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Circus_Bell",
      name: "Circus Bell",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean",
      name: "Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_Deadlift",
      name: "Clean Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Back",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_Pull",
      name: "Clean Pull",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_Shrug",
      name: "Clean Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_and_Jerk",
      name: "Clean and Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_and_Press",
      name: "Clean and Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Quads",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clean_from_Blocks",
      name: "Clean from Blocks",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Clock_Push-Up",
      name: "Clock Push-Up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_Barbell_Bench_Press",
      name: "Close-Grip Barbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_Dumbbell_Press",
      name: "Close-Grip Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_EZ-Bar_Curl_with_Band",
      name: "Close-Grip EZ-Bar Curl with Band",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_EZ-Bar_Press",
      name: "Close-Grip EZ-Bar Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_EZ_Bar_Curl",
      name: "Close-Grip EZ Bar Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_Front_Lat_Pulldown",
      name: "Close-Grip Front Lat Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_Push-Up_off_of_a_Dumbbell",
      name: "Close-Grip Push-Up off of a Dumbbell",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Core",
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Close-Grip_Standing_Barbell_Curl",
      name: "Close-Grip Standing Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cocoons",
      name: "Cocoons",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Conans_Wheel",
      name: "Conan's Wheel",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Calves",
        "Forearms",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Concentration_Curls",
      name: "Concentration Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Cross-Body_Crunch",
      name: "Cross-Body Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cross_Body_Hammer_Curl",
      name: "Cross Body Hammer Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Cross_Over_-_With_Bands",
      name: "Cross Over - With Bands",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Biceps",
        "Shoulders"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Crossover_Reverse_Lunge",
      name: "Crossover Reverse Lunge",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Crucifix",
      name: "Crucifix",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Crunch_-_Hands_Overhead",
      name: "Crunch - Hands Overhead",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Crunch_-_Legs_On_Exercise_Ball",
      name: "Crunch - Legs On Exercise Ball",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Crunches",
      name: "Crunches",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Cuban_Press",
      name: "Cuban Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dancers_Stretch",
      name: "Dancer's Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Glutes"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Dead_Bug",
      name: "Dead Bug",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Deadlift_with_Bands",
      name: "Deadlift with Bands",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Deadlift_with_Chains",
      name: "Deadlift with Chains",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Barbell_Bench_Press",
      name: "Decline Barbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Close-Grip_Bench_To_Skull_Crusher",
      name: "Decline Close-Grip Bench To Skull Crusher",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Crunch",
      name: "Decline Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Dumbbell_Bench_Press",
      name: "Decline Dumbbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Dumbbell_Flyes",
      name: "Decline Dumbbell Flyes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Dumbbell_Triceps_Extension",
      name: "Decline Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Decline_EZ_Bar_Triceps_Extension",
      name: "Decline EZ Bar Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Oblique_Crunch",
      name: "Decline Oblique Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Push-Up",
      name: "Decline Push-Up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Reverse_Crunch",
      name: "Decline Reverse Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Decline_Smith_Press",
      name: "Decline Smith Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Deficit_Deadlift",
      name: "Deficit Deadlift",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Depth_Jump_Leap",
      name: "Depth Jump Leap",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Dip_Machine",
      name: "Dip Machine",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Dips_-_Chest_Version",
      name: "Dips - Chest Version",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Dips_-_Triceps_Version",
      name: "Dips - Triceps Version",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Donkey_Calf_Raises",
      name: "Donkey Calf Raises",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Kettlebell_Alternating_Hang_Clean",
      name: "Double Kettlebell Alternating Hang Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Biceps",
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Kettlebell_Jerk",
      name: "Double Kettlebell Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Kettlebell_Push_Press",
      name: "Double Kettlebell Push Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Kettlebell_Snatch",
      name: "Double Kettlebell Snatch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Kettlebell_Windmill",
      name: "Double Kettlebell Windmill",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Double_Leg_Butt_Kick",
      name: "Double Leg Butt Kick",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Downward_Facing_Balance",
      name: "Downward Facing Balance",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Core",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Drag_Curl",
      name: "Drag Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Drop_Push",
      name: "Drop Push",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Alternate_Bicep_Curl",
      name: "Dumbbell Alternate Bicep Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Bench_Press",
      name: "Dumbbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Bench_Press_with_Neutral_Grip",
      name: "Dumbbell Bench Press with Neutral Grip",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Bicep_Curl",
      name: "Dumbbell Bicep Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Clean",
      name: "Dumbbell Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Floor_Press",
      name: "Dumbbell Floor Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Flyes",
      name: "Dumbbell Flyes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Incline_Row",
      name: "Dumbbell Incline Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Incline_Shoulder_Raise",
      name: "Dumbbell Incline Shoulder Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Lunges",
      name: "Dumbbell Lunges",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Lying_One-Arm_Rear_Lateral_Raise",
      name: "Dumbbell Lying One-Arm Rear Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Lying_Pronation",
      name: "Dumbbell Lying Pronation",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Lying_Rear_Lateral_Raise",
      name: "Dumbbell Lying Rear Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Lying_Supination",
      name: "Dumbbell Lying Supination",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_One-Arm_Shoulder_Press",
      name: "Dumbbell One-Arm Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_One-Arm_Triceps_Extension",
      name: "Dumbbell One-Arm Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_One-Arm_Upright_Row",
      name: "Dumbbell One-Arm Upright Row",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Prone_Incline_Curl",
      name: "Dumbbell Prone Incline Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Raise",
      name: "Dumbbell Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Rear_Lunge",
      name: "Dumbbell Rear Lunge",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Scaption",
      name: "Dumbbell Scaption",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Seated_Box_Jump",
      name: "Dumbbell Seated Box Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Seated_One-Leg_Calf_Raise",
      name: "Dumbbell Seated One-Leg Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Shoulder_Press",
      name: "Dumbbell Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Shrug",
      name: "Dumbbell Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Side_Bend",
      name: "Dumbbell Side Bend",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Squat",
      name: "Dumbbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Squat_To_A_Bench",
      name: "Dumbbell Squat To A Bench",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Step_Ups",
      name: "Dumbbell Step Ups",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dumbbell_Tricep_Extension_-Pronated_Grip",
      name: "Dumbbell Tricep Extension -Pronated Grip",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Dynamic_Back_Stretch",
      name: "Dynamic Back Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Dynamic_Chest_Stretch",
      name: "Dynamic Chest Stretch",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:EZ-Bar_Curl",
      name: "EZ-Bar Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:EZ-Bar_Skullcrusher",
      name: "EZ-Bar Skullcrusher",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Elbow_Circles",
      name: "Elbow Circles",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Elbow_to_Knee",
      name: "Elbow to Knee",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Elbows_Back",
      name: "Elbows Back",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Elevated_Back_Lunge",
      name: "Elevated Back Lunge",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Elevated_Cable_Rows",
      name: "Elevated Cable Rows",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Elliptical_Trainer",
      name: "Elliptical Trainer",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Exercise_Ball_Crunch",
      name: "Exercise Ball Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Exercise_Ball_Pull-In",
      name: "Exercise Ball Pull-In",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Extended_Range_One-Arm_Kettlebell_Floor_Press",
      name: "Extended Range One-Arm Kettlebell Floor Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:External_Rotation",
      name: "External Rotation",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:External_Rotation_with_Band",
      name: "External Rotation with Band",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:External_Rotation_with_Cable",
      name: "External Rotation with Cable",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Face_Pull",
      name: "Face Pull",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Farmers_Walk",
      name: "Farmer's Walk",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Fast_Skipping",
      name: "Fast Skipping",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Finger_Curls",
      name: "Finger Curls",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Flat_Bench_Cable_Flyes",
      name: "Flat Bench Cable Flyes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Flat_Bench_Leg_Pull-In",
      name: "Flat Bench Leg Pull-In",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Flat_Bench_Lying_Leg_Raise",
      name: "Flat Bench Lying Leg Raise",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Flexor_Incline_Dumbbell_Curls",
      name: "Flexor Incline Dumbbell Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Floor_Glute-Ham_Raise",
      name: "Floor Glute-Ham Raise",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Floor_Press",
      name: "Floor Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Floor_Press_with_Chains",
      name: "Floor Press with Chains",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Flutter_Kicks",
      name: "Flutter Kicks",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Foot-SMR",
      name: "Foot-SMR",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Forward_Drag_with_Press",
      name: "Forward Drag with Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Frankenstein_Squat",
      name: "Frankenstein Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Freehand_Jump_Squat",
      name: "Freehand Jump Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Frog_Hops",
      name: "Frog Hops",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Frog_Sit-Ups",
      name: "Frog Sit-Ups",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Barbell_Squat",
      name: "Front Barbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Barbell_Squat_To_A_Bench",
      name: "Front Barbell Squat To A Bench",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Box_Jump",
      name: "Front Box Jump",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Cable_Raise",
      name: "Front Cable Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Cone_Hops_or_hurdle_hops",
      name: "Front Cone Hops (or hurdle hops)",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Dumbbell_Raise",
      name: "Front Dumbbell Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Front_Incline_Dumbbell_Raise",
      name: "Front Incline Dumbbell Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Front_Leg_Raises",
      name: "Front Leg Raises",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Front_Plate_Raise",
      name: "Front Plate Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Raise_And_Pullover",
      name: "Front Raise And Pullover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Squat_Clean_Grip",
      name: "Front Squat (Clean Grip)",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Squats_With_Two_Kettlebells",
      name: "Front Squats With Two Kettlebells",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Front_Two-Dumbbell_Raise",
      name: "Front Two-Dumbbell Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Full_Range-Of-Motion_Lat_Pulldown",
      name: "Full Range-Of-Motion Lat Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Gironda_Sternum_Chins",
      name: "Gironda Sternum Chins",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Glute_Ham_Raise",
      name: "Glute Ham Raise",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Glute_Kickback",
      name: "Glute Kickback",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Goblet_Squat",
      name: "Goblet Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Good_Morning",
      name: "Good Morning",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Good_Morning_off_Pins",
      name: "Good Morning off Pins",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Gorilla_Chin_Crunch",
      name: "Gorilla Chin/Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Groin_and_Back_Stretch",
      name: "Groin and Back Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Groiners",
      name: "Groiners",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Hack_Squat",
      name: "Hack Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hammer_Curls",
      name: "Hammer Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Hammer_Grip_Incline_DB_Bench_Press",
      name: "Hammer Grip Incline DB Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Hamstring-SMR",
      name: "Hamstring-SMR",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Hamstring_Stretch",
      name: "Hamstring Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Handstand_Push-Ups",
      name: "Handstand Push-Ups",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hang_Clean",
      name: "Hang Clean",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hang_Clean_-_Below_the_Knees",
      name: "Hang Clean - Below the Knees",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hang_Snatch",
      name: "Hang Snatch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hang_Snatch_-_Below_Knees",
      name: "Hang Snatch - Below Knees",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hanging_Bar_Good_Morning",
      name: "Hanging Bar Good Morning",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hanging_Leg_Raise",
      name: "Hanging Leg Raise",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hanging_Pike",
      name: "Hanging Pike",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Heaving_Snatch_Balance",
      name: "Heaving Snatch Balance",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Heavy_Bag_Thrust",
      name: "Heavy Bag Thrust",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:High_Cable_Curls",
      name: "High Cable Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hip_Circles_prone",
      name: "Hip Circles (prone)",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Hip_Extension_with_Bands",
      name: "Hip Extension with Bands",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hip_Flexion_with_Band",
      name: "Hip Flexion with Band",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hip_Lift_with_Band",
      name: "Hip Lift with Band",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hug_A_Ball",
      name: "Hug A Ball",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Hug_Knees_To_Chest",
      name: "Hug Knees To Chest",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Hurdle_Hops",
      name: "Hurdle Hops",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hyperextensions_Back_Extensions",
      name: "Hyperextensions (Back Extensions)",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Hyperextensions_With_No_Hyperextension_Bench",
      name: "Hyperextensions With No Hyperextension Bench",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:IT_Band_and_Glute_Stretch",
      name: "IT Band and Glute Stretch",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Iliotibial_Tract-SMR",
      name: "Iliotibial Tract-SMR",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Inchworm",
      name: "Inchworm",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Incline_Barbell_Triceps_Extension",
      name: "Incline Barbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Bench_Pull",
      name: "Incline Bench Pull",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Cable_Chest_Press",
      name: "Incline Cable Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Cable_Flye",
      name: "Incline Cable Flye",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Dumbbell_Bench_With_Palms_Facing_In",
      name: "Incline Dumbbell Bench With Palms Facing In",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Dumbbell_Curl",
      name: "Incline Dumbbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Dumbbell_Flyes",
      name: "Incline Dumbbell Flyes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Dumbbell_Flyes_-_With_A_Twist",
      name: "Incline Dumbbell Flyes - With A Twist",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Dumbbell_Press",
      name: "Incline Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Hammer_Curls",
      name: "Incline Hammer Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Inner_Biceps_Curl",
      name: "Incline Inner Biceps Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up",
      name: "Incline Push-Up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up_Close-Grip",
      name: "Incline Push-Up Close-Grip",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up_Depth_Jump",
      name: "Incline Push-Up Depth Jump",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up_Medium",
      name: "Incline Push-Up Medium",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up_Reverse_Grip",
      name: "Incline Push-Up Reverse Grip",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Incline_Push-Up_Wide",
      name: "Incline Push-Up Wide",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Intermediate_Groin_Stretch",
      name: "Intermediate Groin Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Intermediate_Hip_Flexor_and_Quad_Stretch",
      name: "Intermediate Hip Flexor and Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Internal_Rotation_with_Band",
      name: "Internal Rotation with Band",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Inverted_Row",
      name: "Inverted Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Inverted_Row_with_Straps",
      name: "Inverted Row with Straps",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Iron_Cross",
      name: "Iron Cross",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Iron_Crosses_stretch",
      name: "Iron Crosses (stretch)",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Isometric_Chest_Squeezes",
      name: "Isometric Chest Squeezes",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Isometric_Neck_Exercise_-_Front_And_Back",
      name: "Isometric Neck Exercise - Front And Back",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Isometric_Neck_Exercise_-_Sides",
      name: "Isometric Neck Exercise - Sides",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Isometric_Wipers",
      name: "Isometric Wipers",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:JM_Press",
      name: "JM Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Jackknife_Sit-Up",
      name: "Jackknife Sit-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Janda_Sit-Up",
      name: "Janda Sit-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Jefferson_Squats",
      name: "Jefferson Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Jerk_Balance",
      name: "Jerk Balance",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Quads",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Jerk_Dip_Squat",
      name: "Jerk Dip Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Jogging_Treadmill",
      name: "Jogging, Treadmill",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Keg_Load",
      name: "Keg Load",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Arnold_Press",
      name: "Kettlebell Arnold Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Dead_Clean",
      name: "Kettlebell Dead Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Figure_8",
      name: "Kettlebell Figure 8",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Halo",
      name: "Kettlebell Halo",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back",
        "Back",
        "Core",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Halo_With_Overhead_Extension",
      name: "Kettlebell Halo with Overhead Extension",
      aliases: [],
      primaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      secondaryMuscles: [
        "Back",
        "Back",
        "Core"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Hang_Clean",
      name: "Kettlebell Hang Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_One-Legged_Deadlift",
      name: "Kettlebell One-Legged Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Overhead_Triceps_Extension",
      name: "Kettlebell Overhead Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Core"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Pass_Between_The_Legs",
      name: "Kettlebell Pass Between The Legs",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Pirate_Ships",
      name: "Kettlebell Pirate Ships",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Pistol_Squat",
      name: "Kettlebell Pistol Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Seated_Press",
      name: "Kettlebell Seated Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Seesaw_Press",
      name: "Kettlebell Seesaw Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Sumo_High_Pull",
      name: "Kettlebell Sumo High Pull",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Quads",
        "Glutes",
        "Hamstrings",
        "Quads",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Thruster",
      name: "Kettlebell Thruster",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Turkish_Get-Up_Lunge_style",
      name: "Kettlebell Turkish Get-Up (Lunge style)",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Hamstrings",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Turkish_Get-Up_Squat_style",
      name: "Kettlebell Turkish Get-Up (Squat style)",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Hamstrings",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kettlebell_Windmill",
      name: "Kettlebell Windmill",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kipping_Muscle_Up",
      name: "Kipping Muscle Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Forearms",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Knee_Across_The_Body",
      name: "Knee Across The Body",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Knee_Circles",
      name: "Knee Circles",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Knee_Hip_Raise_On_Parallel_Bars",
      name: "Knee/Hip Raise On Parallel Bars",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Knee_Tuck_Jump",
      name: "Knee Tuck Jump",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Arm_Drill",
      name: "Kneeling Arm Drill",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists",
      name: "Kneeling Cable Crunch With Alternating Oblique Twists",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Cable_Triceps_Extension",
      name: "Kneeling Cable Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Forearm_Stretch",
      name: "Kneeling Forearm Stretch",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Kneeling_High_Pulley_Row",
      name: "Kneeling High Pulley Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Hip_Flexor",
      name: "Kneeling Hip Flexor",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Kneeling_Jump_Squat",
      name: "Kneeling Jump Squat",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings",
        "Quads"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Single-Arm_High_Pulley_Row",
      name: "Kneeling Single-Arm High Pulley Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Kneeling_Squat",
      name: "Kneeling Squat",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Core",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Landmine_180s",
      name: "Landmine 180's",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Landmine_Linear_Jammer",
      name: "Landmine Linear Jammer",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Chest",
        "Hamstrings",
        "Quads",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lateral_Bound",
      name: "Lateral Bound",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lateral_Box_Jump",
      name: "Lateral Box Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lateral_Cone_Hops",
      name: "Lateral Cone Hops",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lateral_Raise_-_With_Bands",
      name: "Lateral Raise - With Bands",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Latissimus_Dorsi-SMR",
      name: "Latissimus Dorsi-SMR",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Leg-Over_Floor_Press",
      name: "Leg-Over Floor Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leg-Up_Hamstring_Stretch",
      name: "Leg-Up Hamstring Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Leg_Extensions",
      name: "Leg Extensions",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leg_Lift",
      name: "Leg Lift",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leg_Press",
      name: "Leg Press",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leg_Pull-In",
      name: "Leg Pull-In",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Chest_Press",
      name: "Leverage Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Deadlift",
      name: "Leverage Deadlift",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Decline_Chest_Press",
      name: "Leverage Decline Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_High_Row",
      name: "Leverage High Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Incline_Chest_Press",
      name: "Leverage Incline Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Iso_Row",
      name: "Leverage Iso Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Shoulder_Press",
      name: "Leverage Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Leverage_Shrug",
      name: "Leverage Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Linear_3-Part_Start_Technique",
      name: "Linear 3-Part Start Technique",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Linear_Acceleration_Wall_Drill",
      name: "Linear Acceleration Wall Drill",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Linear_Depth_Jump",
      name: "Linear Depth Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Log_Lift",
      name: "Log Lift",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Chest",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Quads",
        "Back",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:London_Bridges",
      name: "London Bridges",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Looking_At_Ceiling",
      name: "Looking At Ceiling",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Low_Cable_Crossover",
      name: "Low Cable Crossover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Low_Cable_Triceps_Extension",
      name: "Low Cable Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Low_Pulley_Row_To_Neck",
      name: "Low Pulley Row To Neck",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lower_Back-SMR",
      name: "Lower Back-SMR",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lower_Back_Curl",
      name: "Lower Back Curl",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lunge_Pass_Through",
      name: "Lunge Pass Through",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lunge_Sprint",
      name: "Lunge Sprint",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Bent_Leg_Groin",
      name: "Lying Bent Leg Groin",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lying_Cable_Curl",
      name: "Lying Cable Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Cambered_Barbell_Row",
      name: "Lying Cambered Barbell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Close-Grip_Bar_Curl_On_High_Pulley",
      name: "Lying Close-Grip Bar Curl On High Pulley",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head",
      name: "Lying Close-Grip Barbell Triceps Extension Behind The Head",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Close-Grip_Barbell_Triceps_Press_To_Chin",
      name: "Lying Close-Grip Barbell Triceps Press To Chin",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Crossover",
      name: "Lying Crossover",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lying_Dumbbell_Tricep_Extension",
      name: "Lying Dumbbell Tricep Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Face_Down_Plate_Neck_Resistance",
      name: "Lying Face Down Plate Neck Resistance",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Face_Up_Plate_Neck_Resistance",
      name: "Lying Face Up Plate Neck Resistance",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Glute",
      name: "Lying Glute",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lying_Hamstring",
      name: "Lying Hamstring",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lying_High_Bench_Barbell_Curl",
      name: "Lying High Bench Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Leg_Curls",
      name: "Lying Leg Curls",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Machine_Squat",
      name: "Lying Machine Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_One-Arm_Lateral_Raise",
      name: "Lying One-Arm Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Prone_Quadriceps",
      name: "Lying Prone Quadriceps",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Lying_Rear_Delt_Raise",
      name: "Lying Rear Delt Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Supine_Dumbbell_Curl",
      name: "Lying Supine Dumbbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Lying_T-Bar_Row",
      name: "Lying T-Bar Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Lying_Triceps_Press",
      name: "Lying Triceps Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Machine_Bench_Press",
      name: "Machine Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Machine_Bicep_Curl",
      name: "Machine Bicep Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Machine_Preacher_Curls",
      name: "Machine Preacher Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Machine_Shoulder_Military_Press",
      name: "Machine Shoulder (Military) Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Machine_Triceps_Extension",
      name: "Machine Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Medicine_Ball_Chest_Pass",
      name: "Medicine Ball Chest Pass",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Medicine_Ball_Full_Twist",
      name: "Medicine Ball Full Twist",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Medicine_Ball_Scoop_Throw",
      name: "Medicine Ball Scoop Throw",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Hamstrings",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Middle_Back_Shrug",
      name: "Middle Back Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Middle_Back_Stretch",
      name: "Middle Back Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Back",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Mixed_Grip_Chin",
      name: "Mixed Grip Chin",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Monster_Walk",
      name: "Monster Walk",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Mountain_Climbers",
      name: "Mountain Climbers",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Chest",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Moving_Claw_Series",
      name: "Moving Claw Series",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Muscle_Snatch",
      name: "Muscle Snatch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Muscle_Up",
      name: "Muscle Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Forearms",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Narrow_Stance_Hack_Squats",
      name: "Narrow Stance Hack Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Narrow_Stance_Leg_Press",
      name: "Narrow Stance Leg Press",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Narrow_Stance_Squats",
      name: "Narrow Stance Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Natural_Glute_Ham_Raise",
      name: "Natural Glute Ham Raise",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Neck-SMR",
      name: "Neck-SMR",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Neck_Press",
      name: "Neck Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Oblique_Crunches",
      name: "Oblique Crunches",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Oblique_Crunches_-_On_The_Floor",
      name: "Oblique Crunches - On The Floor",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Olympic_Squat",
      name: "Olympic Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:On-Your-Back_Quad_Stretch",
      name: "On-Your-Back Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:On_Your_Side_Quad_Stretch",
      name: "On Your Side Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:One-Arm_Dumbbell_Row",
      name: "One-Arm Dumbbell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Flat_Bench_Dumbbell_Flye",
      name: "One-Arm Flat Bench Dumbbell Flye",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_High-Pulley_Cable_Side_Bends",
      name: "One-Arm High-Pulley Cable Side Bends",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Incline_Lateral_Raise",
      name: "One-Arm Incline Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Clean",
      name: "One-Arm Kettlebell Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Clean_and_Jerk",
      name: "One-Arm Kettlebell Clean and Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Floor_Press",
      name: "One-Arm Kettlebell Floor Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Jerk",
      name: "One-Arm Kettlebell Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Military_Press_To_The_Side",
      name: "One-Arm Kettlebell Military Press To The Side",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Para_Press",
      name: "One-Arm Kettlebell Para Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Push_Press",
      name: "One-Arm Kettlebell Push Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Row",
      name: "One-Arm Kettlebell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Snatch",
      name: "One-Arm Kettlebell Snatch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Split_Jerk",
      name: "One-Arm Kettlebell Split Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Split_Snatch",
      name: "One-Arm Kettlebell Split Snatch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Quads"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Kettlebell_Swings",
      name: "One-Arm Kettlebell Swings",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Long_Bar_Row",
      name: "One-Arm Long Bar Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Medicine_Ball_Slam",
      name: "One-Arm Medicine Ball Slam",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Open_Palm_Kettlebell_Clean",
      name: "One-Arm Open Palm Kettlebell Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Overhead_Kettlebell_Squats",
      name: "One-Arm Overhead Kettlebell Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Side_Deadlift",
      name: "One-Arm Side Deadlift",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One-Arm_Side_Laterals",
      name: "One-Arm Side Laterals",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One-Legged_Cable_Kickback",
      name: "One-Legged Cable Kickback",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Against_Wall",
      name: "One Arm Against Wall",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:One_Arm_Chin-Up",
      name: "One Arm Chin-Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Dumbbell_Bench_Press",
      name: "One Arm Dumbbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Dumbbell_Preacher_Curl",
      name: "One Arm Dumbbell Preacher Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Floor_Press",
      name: "One Arm Floor Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Lat_Pulldown",
      name: "One Arm Lat Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Pronated_Dumbbell_Triceps_Extension",
      name: "One Arm Pronated Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One_Arm_Supinated_Dumbbell_Triceps_Extension",
      name: "One Arm Supinated Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:One_Half_Locust",
      name: "One Half Locust",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Chest"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:One_Handed_Hang",
      name: "One Handed Hang",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:One_Knee_To_Chest",
      name: "One Knee To Chest",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:One_Leg_Barbell_Squat",
      name: "One Leg Barbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Open_Palm_Kettlebell_Clean",
      name: "Open Palm Kettlebell Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back",
        "Quads",
        "Shoulders"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Otis-Up",
      name: "Otis-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Overhead_Cable_Curl",
      name: "Overhead Cable Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Overhead_Lat",
      name: "Overhead Lat",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Overhead_Slam",
      name: "Overhead Slam",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Overhead_Squat",
      name: "Overhead Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Overhead_Stretch",
      name: "Overhead Stretch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms",
        "Back",
        "Triceps"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Overhead_Triceps",
      name: "Overhead Triceps",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Pallof_Press",
      name: "Pallof Press",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders",
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pallof_Press_With_Rotation",
      name: "Pallof Press With Rotation",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders",
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench",
      name: "Palms-Down Dumbbell Wrist Curl Over A Bench",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Palms-Down_Wrist_Curl_Over_A_Bench",
      name: "Palms-Down Wrist Curl Over A Bench",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
      name: "Palms-Up Barbell Wrist Curl Over A Bench",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench",
      name: "Palms-Up Dumbbell Wrist Curl Over A Bench",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Parallel_Bar_Dip",
      name: "Parallel Bar Dip",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pelvic_Tilt_Into_Bridge",
      name: "Pelvic Tilt Into Bridge",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Peroneals-SMR",
      name: "Peroneals-SMR",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Peroneals_Stretch",
      name: "Peroneals Stretch",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Physioball_Hip_Bridge",
      name: "Physioball Hip Bridge",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pin_Presses",
      name: "Pin Presses",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms",
        "Back",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Piriformis-SMR",
      name: "Piriformis-SMR",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Plank",
      name: "Plank",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Plate_Pinch",
      name: "Plate Pinch",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Plate_Twist",
      name: "Plate Twist",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Platform_Hamstring_Slides",
      name: "Platform Hamstring Slides",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Plie_Dumbbell_Squat",
      name: "Plie Dumbbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Plyo_Kettlebell_Pushups",
      name: "Plyo Kettlebell Pushups",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Plyo_Push-up",
      name: "Plyo Push-up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Posterior_Tibialis_Stretch",
      name: "Posterior Tibialis Stretch",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Power_Clean",
      name: "Power Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Back",
        "Quads",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Power_Clean_from_Blocks",
      name: "Power Clean from Blocks",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Power_Jerk",
      name: "Power Jerk",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Power_Partials",
      name: "Power Partials",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Power_Snatch",
      name: "Power Snatch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Power_Snatch_from_Blocks",
      name: "Power Snatch from Blocks",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Power_Stairs",
      name: "Power Stairs",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves",
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Preacher_Curl",
      name: "Preacher Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Preacher_Hammer_Dumbbell_Curl",
      name: "Preacher Hammer Dumbbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Press_Sit-Up",
      name: "Press Sit-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Prone_Manual_Hamstring",
      name: "Prone Manual Hamstring",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Prowler_Sprint",
      name: "Prowler Sprint",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Chest",
        "Glutes",
        "Quads",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Pull_Through",
      name: "Pull Through",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pullups",
      name: "Pullups",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push-Up_Wide",
      name: "Push-Up Wide",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push-Ups_-_Close_Triceps_Position",
      name: "Push-Ups - Close Triceps Position",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push-Ups_With_Feet_Elevated",
      name: "Push-Ups With Feet Elevated",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push-Ups_With_Feet_On_An_Exercise_Ball",
      name: "Push-Ups With Feet On An Exercise Ball",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push_Press",
      name: "Push Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Quads",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push_Press_-_Behind_the_Neck",
      name: "Push Press - Behind the Neck",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Push_Up_to_Side_Plank",
      name: "Push Up to Side Plank",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Core",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pushups",
      name: "Pushups",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pushups_Close_and_Wide_Hand_Positions",
      name: "Pushups (Close and Wide Hand Positions)",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Pyramid",
      name: "Pyramid",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Quad_Stretch",
      name: "Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Quadriceps-SMR",
      name: "Quadriceps-SMR",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Quick_Leap",
      name: "Quick Leap",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rack_Delivery",
      name: "Rack Delivery",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rack_Pull_with_Bands",
      name: "Rack Pull with Bands",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rack_Pulls",
      name: "Rack Pulls",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rear_Leg_Raises",
      name: "Rear Leg Raises",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Recumbent_Bike",
      name: "Recumbent Bike",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Return_Push_from_Stance",
      name: "Return Push from Stance",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Band_Bench_Press",
      name: "Reverse Band Bench Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Forearms",
        "Back",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Band_Box_Squat",
      name: "Reverse Band Box Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Band_Deadlift",
      name: "Reverse Band Deadlift",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Quads"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Band_Power_Squat",
      name: "Reverse Band Power Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Band_Sumo_Deadlift",
      name: "Reverse Band Sumo Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Forearms",
        "Glutes",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Barbell_Curl",
      name: "Reverse Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Barbell_Preacher_Curls",
      name: "Reverse Barbell Preacher Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Cable_Curl",
      name: "Reverse Cable Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Crunch",
      name: "Reverse Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Flyes",
      name: "Reverse Flyes",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Flyes_With_External_Rotation",
      name: "Reverse Flyes With External Rotation",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Grip_Bent-Over_Rows",
      name: "Reverse Grip Bent-Over Rows",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Grip_Triceps_Pushdown",
      name: "Reverse Grip Triceps Pushdown",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Hyperextension",
      name: "Reverse Hyperextension",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Machine_Flyes",
      name: "Reverse Machine Flyes",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Plate_Curls",
      name: "Reverse Plate Curls",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Reverse_Triceps_Bench_Press",
      name: "Reverse Triceps Bench Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rhomboids-SMR",
      name: "Rhomboids-SMR",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Rickshaw_Carry",
      name: "Rickshaw Carry",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [
        "Core",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rickshaw_Deadlift",
      name: "Rickshaw Deadlift",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Ring_Dips",
      name: "Ring Dips",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rocket_Jump",
      name: "Rocket Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rocking_Standing_Calf_Raise",
      name: "Rocking Standing Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rocky_Pull-Ups_Pulldowns",
      name: "Rocky Pull-Ups/Pulldowns",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Romanian_Deadlift",
      name: "Romanian Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Romanian_Deadlift_from_Deficit",
      name: "Romanian Deadlift from Deficit",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Back",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rope_Climb",
      name: "Rope Climb",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rope_Crunch",
      name: "Rope Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Rope_Jumping",
      name: "Rope Jumping",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Rope_Straight-Arm_Pulldown",
      name: "Rope Straight-Arm Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Round_The_World_Shoulder_Stretch",
      name: "Round The World Shoulder Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Chest"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Rowing_Stationary",
      name: "Rowing, Stationary",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Biceps",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Runners_Stretch",
      name: "Runner's Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Running_Treadmill",
      name: "Running, Treadmill",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Russian_Twist",
      name: "Russian Twist",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sandbag_Load",
      name: "Sandbag Load",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Biceps",
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Scapular_Pull-Up",
      name: "Scapular Pull-Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Scissor_Kick",
      name: "Scissor Kick",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Scissors_Jump",
      name: "Scissors Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Band_Hamstring_Curl",
      name: "Seated Band Hamstring Curl",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Barbell_Military_Press",
      name: "Seated Barbell Military Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Barbell_Twist",
      name: "Seated Barbell Twist",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
      name: "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Bent-Over_Rear_Delt_Raise",
      name: "Seated Bent-Over Rear Delt Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
      name: "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Biceps",
      name: "Seated Biceps",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Cable_Rows",
      name: "Seated Cable Rows",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Cable_Shoulder_Press",
      name: "Seated Cable Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Calf_Raise",
      name: "Seated Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Calf_Stretch",
      name: "Seated Calf Stretch",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Close-Grip_Concentration_Barbell_Curl",
      name: "Seated Close-Grip Concentration Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Dumbbell_Curl",
      name: "Seated Dumbbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Dumbbell_Inner_Biceps_Curl",
      name: "Seated Dumbbell Inner Biceps Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Dumbbell_Palms-Down_Wrist_Curl",
      name: "Seated Dumbbell Palms-Down Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Dumbbell_Palms-Up_Wrist_Curl",
      name: "Seated Dumbbell Palms-Up Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Dumbbell_Press",
      name: "Seated Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Flat_Bench_Leg_Pull-In",
      name: "Seated Flat Bench Leg Pull-In",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Floor_Hamstring_Stretch",
      name: "Seated Floor Hamstring Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Front_Deltoid",
      name: "Seated Front Deltoid",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Glute",
      name: "Seated Glute",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Good_Mornings",
      name: "Seated Good Mornings",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Hamstring",
      name: "Seated Hamstring",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Hamstring_and_Calf_Stretch",
      name: "Seated Hamstring and Calf Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Head_Harness_Neck_Resistance",
      name: "Seated Head Harness Neck Resistance",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Leg_Curl",
      name: "Seated Leg Curl",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Leg_Tucks",
      name: "Seated Leg Tucks",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
      name: "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_One-Arm_Dumbbell_Palms-Up_Wrist_Curl",
      name: "Seated One-Arm Dumbbell Palms-Up Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_One-arm_Cable_Pulley_Rows",
      name: "Seated One-arm Cable Pulley Rows",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Overhead_Stretch",
      name: "Seated Overhead Stretch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Seated_Palm-Up_Barbell_Wrist_Curl",
      name: "Seated Palm-Up Barbell Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Palms-Down_Barbell_Wrist_Curl",
      name: "Seated Palms-Down Barbell Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Side_Lateral_Raise",
      name: "Seated Side Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Triceps_Press",
      name: "Seated Triceps Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
      name: "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:See-Saw_Press_Alternating_Side_Press",
      name: "See-Saw Press (Alternating Side Press)",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Core",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Shotgun_Row",
      name: "Shotgun Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Shoulder_Circles",
      name: "Shoulder Circles",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Shoulder_Press_-_With_Bands",
      name: "Shoulder Press - With Bands",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Shoulder_Raise",
      name: "Shoulder Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Shoulder_Stretch",
      name: "Shoulder Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side-Lying_Floor_Stretch",
      name: "Side-Lying Floor Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side_Bridge",
      name: "Side Bridge",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Side_Hop-Sprint",
      name: "Side Hop-Sprint",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Side_Jackknife",
      name: "Side Jackknife",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Side_Lateral_Raise",
      name: "Side Lateral Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Side_Laterals_to_Front_Raise",
      name: "Side Laterals to Front Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Side_Leg_Raises",
      name: "Side Leg Raises",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side_Lying_Groin_Stretch",
      name: "Side Lying Groin Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side_Neck_Stretch",
      name: "Side Neck Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side_Standing_Long_Jump",
      name: "Side Standing Long Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Side_To_Side_Chins",
      name: "Side To Side Chins",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Forearms",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Side_Wrist_Pull",
      name: "Side Wrist Pull",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Side_to_Side_Box_Shuffle",
      name: "Side to Side Box Shuffle",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Arm_Cable_Crossover",
      name: "Single-Arm Cable Crossover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Arm_Linear_Jammer",
      name: "Single-Arm Linear Jammer",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Arm_Push-Up",
      name: "Single-Arm Push-Up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Cone_Sprint_Drill",
      name: "Single-Cone Sprint Drill",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Leg_High_Box_Squat",
      name: "Single-Leg High Box Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Leg_Hop_Progression",
      name: "Single-Leg Hop Progression",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Leg_Lateral_Hop",
      name: "Single-Leg Lateral Hop",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Leg_Leg_Extension",
      name: "Single-Leg Leg Extension",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single-Leg_Stride_Jump",
      name: "Single-Leg Stride Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single_Dumbbell_Raise",
      name: "Single Dumbbell Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Single_Leg_Butt_Kick",
      name: "Single Leg Butt Kick",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single_Leg_Glute_Bridge",
      name: "Single Leg Glute Bridge",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Single_Leg_Push-off",
      name: "Single Leg Push-off",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sit-Up",
      name: "Sit-Up",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sit_Squats",
      name: "Sit Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Skating",
      name: "Skating",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Sled_Drag_-_Harness",
      name: "Sled Drag - Harness",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sled_Overhead_Backward_Walk",
      name: "Sled Overhead Backward Walk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Back",
        "Quads"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sled_Overhead_Triceps_Extension",
      name: "Sled Overhead Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sled_Push",
      name: "Sled Push",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Chest",
        "Glutes",
        "Hamstrings",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sled_Reverse_Flye",
      name: "Sled Reverse Flye",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sled_Row",
      name: "Sled Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sledgehammer_Swings",
      name: "Sledgehammer Swings",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Back",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Incline_Shoulder_Raise",
      name: "Smith Incline Shoulder Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Behind_the_Back_Shrug",
      name: "Smith Machine Behind the Back Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Bench_Press",
      name: "Smith Machine Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Bent_Over_Row",
      name: "Smith Machine Bent Over Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Calf_Raise",
      name: "Smith Machine Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Close-Grip_Bench_Press",
      name: "Smith Machine Close-Grip Bench Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Decline_Press",
      name: "Smith Machine Decline Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Hang_Power_Clean",
      name: "Smith Machine Hang Power Clean",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back",
        "Quads",
        "Shoulders",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Hip_Raise",
      name: "Smith Machine Hip Raise",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Incline_Bench_Press",
      name: "Smith Machine Incline Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Leg_Press",
      name: "Smith Machine Leg Press",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_One-Arm_Upright_Row",
      name: "Smith Machine One-Arm Upright Row",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Overhead_Shoulder_Press",
      name: "Smith Machine Overhead Shoulder Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Pistol_Squat",
      name: "Smith Machine Pistol Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Reverse_Calf_Raises",
      name: "Smith Machine Reverse Calf Raises",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Squat",
      name: "Smith Machine Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Stiff-Legged_Deadlift",
      name: "Smith Machine Stiff-Legged Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Machine_Upright_Row",
      name: "Smith Machine Upright Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Smith_Single-Leg_Split_Squat",
      name: "Smith Single-Leg Split Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch",
      name: "Snatch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Biceps",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch_Balance",
      name: "Snatch Balance",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch_Deadlift",
      name: "Snatch Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch_Pull",
      name: "Snatch Pull",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch_Shrug",
      name: "Snatch Shrug",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Forearms",
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Snatch_from_Blocks",
      name: "Snatch from Blocks",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Speed_Band_Overhead_Triceps",
      name: "Speed Band Overhead Triceps",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Speed_Box_Squat",
      name: "Speed Box Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Speed_Squats",
      name: "Speed Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Spell_Caster",
      name: "Spell Caster",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Glutes",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Spider_Crawl",
      name: "Spider Crawl",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders",
        "Triceps"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Spider_Curl",
      name: "Spider Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Spinal_Stretch",
      name: "Spinal Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Split_Clean",
      name: "Split Clean",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Split_Jerk",
      name: "Split Jerk",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Split_Jump",
      name: "Split Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Split_Snatch",
      name: "Split Snatch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Quads",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Split_Squat_with_Dumbbells",
      name: "Split Squat with Dumbbells",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Split_Squats",
      name: "Split Squats",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Squat_Jerk",
      name: "Squat Jerk",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Squat_with_Bands",
      name: "Squat with Bands",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Squat_with_Chains",
      name: "Squat with Chains",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Squat_with_Plate_Movers",
      name: "Squat with Plate Movers",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Squats_-_With_Bands",
      name: "Squats - With Bands",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Stairmaster",
      name: "Stairmaster",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Standing_Alternating_Dumbbell_Press",
      name: "Standing Alternating Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Barbell_Calf_Raise",
      name: "Standing Barbell Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Barbell_Press_Behind_Neck",
      name: "Standing Barbell Press Behind Neck",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
      name: "Standing Bent-Over One-Arm Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
      name: "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Biceps_Cable_Curl",
      name: "Standing Biceps Cable Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Biceps_Stretch",
      name: "Standing Biceps Stretch",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Bradford_Press",
      name: "Standing Bradford Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Cable_Chest_Press",
      name: "Standing Cable Chest Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Cable_Lift",
      name: "Standing Cable Lift",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Cable_Wood_Chop",
      name: "Standing Cable Wood Chop",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Calf_Raises",
      name: "Standing Calf Raises",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Concentration_Curl",
      name: "Standing Concentration Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Calf_Raise",
      name: "Standing Dumbbell Calf Raise",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Press",
      name: "Standing Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Reverse_Curl",
      name: "Standing Dumbbell Reverse Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head",
      name: "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Triceps_Extension",
      name: "Standing Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Dumbbell_Upright_Row",
      name: "Standing Dumbbell Upright Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Elevated_Quad_Stretch",
      name: "Standing Elevated Quad Stretch",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Front_Barbell_Raise_Over_Head",
      name: "Standing Front Barbell Raise Over Head",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Gastrocnemius_Calf_Stretch",
      name: "Standing Gastrocnemius Calf Stretch",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Hamstring_and_Calf_Stretch",
      name: "Standing Hamstring and Calf Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Hip_Circles",
      name: "Standing Hip Circles",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Hip_Flexors",
      name: "Standing Hip Flexors",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Inner-Biceps_Curl",
      name: "Standing Inner-Biceps Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Lateral_Stretch",
      name: "Standing Lateral Stretch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Leg_Curl",
      name: "Standing Leg Curl",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Long_Jump",
      name: "Standing Long Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Low-Pulley_Deltoid_Raise",
      name: "Standing Low-Pulley Deltoid Raise",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Low-Pulley_One-Arm_Triceps_Extension",
      name: "Standing Low-Pulley One-Arm Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Military_Press",
      name: "Standing Military Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Olympic_Plate_Hand_Squeeze",
      name: "Standing Olympic Plate Hand Squeeze",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [
        "Biceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_One-Arm_Cable_Curl",
      name: "Standing One-Arm Cable Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench",
      name: "Standing One-Arm Dumbbell Curl Over Incline Bench",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_One-Arm_Dumbbell_Triceps_Extension",
      name: "Standing One-Arm Dumbbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Overhead_Barbell_Triceps_Extension",
      name: "Standing Overhead Barbell Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Palm-In_One-Arm_Dumbbell_Press",
      name: "Standing Palm-In One-Arm Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Palms-In_Dumbbell_Press",
      name: "Standing Palms-In Dumbbell Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl",
      name: "Standing Palms-Up Barbell Behind The Back Wrist Curl",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Pelvic_Tilt",
      name: "Standing Pelvic Tilt",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Rope_Crunch",
      name: "Standing Rope Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Soleus_And_Achilles_Stretch",
      name: "Standing Soleus And Achilles Stretch",
      aliases: [],
      primaryMuscles: [
        "Calves"
      ],
      secondaryMuscles: [],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Toe_Touches",
      name: "Standing Toe Touches",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Standing_Towel_Triceps_Extension",
      name: "Standing Towel Triceps Extension",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Standing_Two-Arm_Overhead_Throw",
      name: "Standing Two-Arm Overhead Throw",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Star_Jump",
      name: "Star Jump",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Step-up_with_Knee_Raise",
      name: "Step-up with Knee Raise",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Hamstrings",
        "Quads"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Step_Mill",
      name: "Step Mill",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Stiff-Legged_Barbell_Deadlift",
      name: "Stiff-Legged Barbell Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Stiff-Legged_Dumbbell_Deadlift",
      name: "Stiff-Legged Dumbbell Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Back"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Stiff_Leg_Barbell_Good_Morning",
      name: "Stiff Leg Barbell Good Morning",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Stomach_Vacuum",
      name: "Stomach Vacuum",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Straight-Arm_Dumbbell_Pullover",
      name: "Straight-Arm Dumbbell Pullover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Back",
        "Shoulders",
        "Triceps"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Straight-Arm_Pulldown",
      name: "Straight-Arm Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Straight_Bar_Bench_Mid_Rows",
      name: "Straight Bar Bench Mid Rows",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Straight_Raises_on_Incline_Bench",
      name: "Straight Raises on Incline Bench",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Stride_Jump_Crossover",
      name: "Stride Jump Crossover",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sumo_Deadlift",
      name: "Sumo Deadlift",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads",
        "Forearms",
        "Glutes",
        "Back",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sumo_Deadlift_with_Bands",
      name: "Sumo Deadlift with Bands",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads",
        "Forearms",
        "Glutes",
        "Back",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Sumo_Deadlift_with_Chains",
      name: "Sumo Deadlift with Chains",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Forearms",
        "Glutes",
        "Back",
        "Back",
        "Quads",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Superman",
      name: "Superman",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Supine_Chest_Throw",
      name: "Supine Chest Throw",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Supine_One-Arm_Overhead_Throw",
      name: "Supine One-Arm Overhead Throw",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Supine_Two-Arm_Overhead_Throw",
      name: "Supine Two-Arm Overhead Throw",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Suspended_Fallout",
      name: "Suspended Fallout",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [
        "Chest",
        "Back",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Suspended_Push-Up",
      name: "Suspended Push-Up",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Suspended_Reverse_Crunch",
      name: "Suspended Reverse Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Suspended_Row",
      name: "Suspended Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Suspended_Split_Squat",
      name: "Suspended Split Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Svend_Press",
      name: "Svend Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Forearms",
        "Shoulders",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:T-Bar_Row_with_Handle",
      name: "T-Bar Row with Handle",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Tate_Press",
      name: "Tate Press",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:The_Straddle",
      name: "The Straddle",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads",
        "Calves"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Thigh_Abductor",
      name: "Thigh Abductor",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Glutes"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Thigh_Adductor",
      name: "Thigh Adductor",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Tire_Flip",
      name: "Tire Flip",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Chest",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Back",
        "Shoulders",
        "Back",
        "Triceps"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Toe_Touchers",
      name: "Toe Touchers",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Torso_Rotation",
      name: "Torso Rotation",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Trail_Running_Walking",
      name: "Trail Running/Walking",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Trap_Bar_Deadlift",
      name: "Trap Bar Deadlift",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Tricep_Dumbbell_Kickback",
      name: "Tricep Dumbbell Kickback",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Tricep_Side_Stretch",
      name: "Tricep Side Stretch",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Triceps_Overhead_Extension_with_Rope",
      name: "Triceps Overhead Extension with Rope",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Triceps_Pushdown",
      name: "Triceps Pushdown",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Triceps_Pushdown_-_Rope_Attachment",
      name: "Triceps Pushdown - Rope Attachment",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Triceps_Pushdown_-_V-Bar_Attachment",
      name: "Triceps Pushdown - V-Bar Attachment",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Triceps_Stretch",
      name: "Triceps Stretch",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Tuck_Crunch",
      name: "Tuck Crunch",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Two-Arm_Dumbbell_Preacher_Curl",
      name: "Two-Arm Dumbbell Preacher Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Two-Arm_Kettlebell_Clean",
      name: "Two-Arm Kettlebell Clean",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Two-Arm_Kettlebell_Jerk",
      name: "Two-Arm Kettlebell Jerk",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Calves",
        "Quads",
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Two-Arm_Kettlebell_Military_Press",
      name: "Two-Arm Kettlebell Military Press",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Triceps"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Two-Arm_Kettlebell_Row",
      name: "Two-Arm Kettlebell Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "kettlebells",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Underhand_Cable_Pulldowns",
      name: "Underhand Cable Pulldowns",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Upper_Back-Leg_Grab",
      name: "Upper Back-Leg Grab",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Back",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Upper_Back_Stretch",
      name: "Upper Back Stretch",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Upright_Barbell_Row",
      name: "Upright Barbell Row",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Upright_Cable_Row",
      name: "Upright Cable Row",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Upright_Row_-_With_Bands",
      name: "Upright Row - With Bands",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "band",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Upward_Stretch",
      name: "Upward Stretch",
      aliases: [],
      primaryMuscles: [
        "Shoulders"
      ],
      secondaryMuscles: [
        "Chest",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:V-Bar_Pulldown",
      name: "V-Bar Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:V-Bar_Pullup",
      name: "V-Bar Pullup",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Vertical_Swing",
      name: "Vertical Swing",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Glutes",
        "Quads",
        "Shoulders"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Walking_Treadmill",
      name: "Walking, Treadmill",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "machine",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "distance"
    },
    {
      id: "fedb:Weighted_Ball_Hyperextension",
      name: "Weighted Ball Hyperextension",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Ball_Side_Bend",
      name: "Weighted Ball Side Bend",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Bench_Dip",
      name: "Weighted Bench Dip",
      aliases: [],
      primaryMuscles: [
        "Triceps"
      ],
      secondaryMuscles: [
        "Chest",
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Crunches",
      name: "Weighted Crunches",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Jump_Squat",
      name: "Weighted Jump Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Pull_Ups",
      name: "Weighted Pull Ups",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Sissy_Squat",
      name: "Weighted Sissy Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Sit-Ups_-_With_Bands",
      name: "Weighted Sit-Ups - With Bands",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Weighted_Squat",
      name: "Weighted Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Barbell_Bench_Press",
      name: "Wide-Grip Barbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Decline_Barbell_Bench_Press",
      name: "Wide-Grip Decline Barbell Bench Press",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Decline_Barbell_Pullover",
      name: "Wide-Grip Decline Barbell Pullover",
      aliases: [],
      primaryMuscles: [
        "Chest"
      ],
      secondaryMuscles: [
        "Shoulders",
        "Triceps"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Lat_Pulldown",
      name: "Wide-Grip Lat Pulldown",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Pulldown_Behind_The_Neck",
      name: "Wide-Grip Pulldown Behind The Neck",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "cable",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Rear_Pull-Up",
      name: "Wide-Grip Rear Pull-Up",
      aliases: [],
      primaryMuscles: [
        "Back"
      ],
      secondaryMuscles: [
        "Biceps",
        "Back",
        "Shoulders"
      ],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide-Grip_Standing_Barbell_Curl",
      name: "Wide-Grip Standing Barbell Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide_Stance_Barbell_Squat",
      name: "Wide Stance Barbell Squat",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wide_Stance_Stiff_Legs",
      name: "Wide Stance Stiff Legs",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Quads",
        "Glutes",
        "Back"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wind_Sprints",
      name: "Wind Sprints",
      aliases: [],
      primaryMuscles: [
        "Core"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Windmills",
      name: "Windmills",
      aliases: [],
      primaryMuscles: [
        "Glutes"
      ],
      secondaryMuscles: [
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Worlds_Greatest_Stretch",
      name: "World's Greatest Stretch",
      aliases: [],
      primaryMuscles: [
        "Hamstrings"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Quads"
      ],
      equipment: "unknown",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Wrist_Circles",
      name: "Wrist Circles",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "bodyweight",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "duration"
    },
    {
      id: "fedb:Wrist_Roller",
      name: "Wrist Roller",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [
        "Shoulders"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Wrist_Rotations_with_Straight_Bar",
      name: "Wrist Rotations with Straight Bar",
      aliases: [],
      primaryMuscles: [
        "Forearms"
      ],
      secondaryMuscles: [],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Yoke_Walk",
      name: "Yoke Walk",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Core",
        "Glutes",
        "Quads",
        "Calves",
        "Glutes",
        "Hamstrings",
        "Back"
      ],
      equipment: "other",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Zercher_Squats",
      name: "Zercher Squats",
      aliases: [],
      primaryMuscles: [
        "Quads"
      ],
      secondaryMuscles: [
        "Calves",
        "Glutes",
        "Hamstrings"
      ],
      equipment: "barbell",
      minReps: 8,
      maxReps: 12,
      increment: 2.5,
      modality: "strength"
    },
    {
      id: "fedb:Zottman_Curl",
      name: "Zottman Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    },
    {
      id: "fedb:Zottman_Preacher_Curl",
      name: "Zottman Preacher Curl",
      aliases: [],
      primaryMuscles: [
        "Biceps"
      ],
      secondaryMuscles: [
        "Forearms"
      ],
      equipment: "dumbbell",
      minReps: 8,
      maxReps: 12,
      increment: 2,
      modality: "strength"
    }
  ];

  // apps/web/lib/exercises/catalogue.ts
  var exerciseSchema = external_exports.object({ id: external_exports.string().min(1).max(160), name: external_exports.string().min(1).max(100), aliases: external_exports.array(external_exports.string().max(100)).max(30), primaryMuscles: external_exports.array(external_exports.string().max(40)).min(1).max(6), secondaryMuscles: external_exports.array(external_exports.string().max(40)).max(10), equipment: external_exports.enum(["barbell", "dumbbell", "cable", "machine", "bodyweight", "kettlebell", "band", "other", "unknown"]), minReps: external_exports.number().int().min(1).max(30), maxReps: external_exports.number().int().min(1).max(30), increment: external_exports.number().min(0.5).max(5), modality: external_exports.enum(["strength", "distance", "interval", "duration"]) }).refine((x) => x.minReps <= x.maxReps);
  var catalogue = catalogue_default;
  var normalizeExercise = (name) => name.toLowerCase().replace(/dumble|dumbell/g, "dumbbell").replace(/inclined/g, "incline").replace(/[^a-z0-9]+/g, " ").trim();
  function similarity(a, b) {
    a = normalizeExercise(a);
    b = normalizeExercise(b);
    if (a === b) return 1;
    if (!a || !b) return 0;
    let row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const next = [i];
      for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      row = next;
    }
    return 1 - row[b.length] / Math.max(a.length, b.length);
  }
  function exerciseMatches(name, custom2 = []) {
    return [...custom2, ...catalogue].map((exercise) => ({ exercise, score: Math.max(...[exercise.name, ...exercise.aliases].map((x) => similarity(name, x))) })).filter((x) => x.score >= 0.6).sort((a, b) => b.score - a.score || a.exercise.id.localeCompare(b.exercise.id)).slice(0, 5);
  }
  function exerciseIdentity(name, id) {
    if (id) return id;
    const found = exerciseMatches(name);
    return found[0] && found[0].score >= 0.9 && (!found[1] || found[0].score > found[1].score) ? found[0].exercise.id : "custom:" + normalizeExercise(name).replace(/ /g, "-");
  }
  function sameExercise(a, name, id) {
    return exerciseIdentity(a.exercise, a.exerciseId) === exerciseIdentity(name, id);
  }

  // apps/web/lib/exercises/migration.ts
  function migrateExercises(input) {
    const s = structuredClone(input);
    s.customExercises ??= [];
    s.exerciseMatches ??= [];
    const seen = /* @__PURE__ */ new Map();
    function identify(name, muscle) {
      const key = normalizeExercise(name);
      if (seen.has(key)) return seen.get(key);
      const existing = s.customExercises.find((x) => normalizeExercise(x.name) === key);
      if (existing) {
        seen.set(key, existing.id);
        return existing.id;
      }
      const matches = exerciseMatches(name);
      const best = matches[0];
      if (best && best.score >= 0.9 && (!matches[1] || best.score > matches[1].score)) {
        seen.set(key, best.exercise.id);
        return best.exercise.id;
      }
      const id = "custom:" + key.replace(/ /g, "-");
      const custom2 = { id, name, aliases: [], primaryMuscles: [muscle || "Other"], secondaryMuscles: [], equipment: "unknown", minReps: 8, maxReps: 12, increment: 2.5, modality: "strength" };
      s.customExercises.push(custom2);
      seen.set(key, id);
      if (best) s.exerciseMatches.push({ legacyId: id, name, candidateId: best.exercise.id, score: best.score });
      return id;
    }
    for (const w of s.workouts) for (const set of w.sets) if (!set.exerciseId) set.exerciseId = identify(set.exercise, set.muscle);
    for (const session of s.program?.sessions ?? []) for (const e of session.exercises) if (!e.exerciseId) e.exerciseId = identify(e.name, e.muscle);
    s.exerciseCatalogueVersion = 1;
    return s;
  }
  function confirmExerciseMatch(s, legacyId, targetId) {
    const target = [...catalogue, ...s.customExercises ?? []].find((x) => x.id === targetId);
    if (!target) throw new Error("Exercise not found");
    if (!s.exerciseMatches?.some((x) => x.legacyId === legacyId)) throw new Error("Match already reviewed");
    for (const w of s.workouts) for (const set of w.sets) if (set.exerciseId === legacyId) set.exerciseId = targetId;
    for (const session of s.program?.sessions ?? []) for (const e of session.exercises) if (e.exerciseId === legacyId) e.exerciseId = targetId;
    s.exerciseMatches = s.exerciseMatches.filter((x) => x.legacyId !== legacyId);
  }

  // apps/web/lib/ai/coach-boundaries.ts
  function coachBoundary(message) {
    if (/\b(pain|hurts?|torn|swollen|swelling|sprain\w*|injur\w*|diagnos\w*|medication|ibuprofen|advil|painkillers?|naproxen|acetaminophen|paracetamol)\b|chest pain|treat my/i.test(message))
      return "I can\u2019t determine what is causing your symptoms, whether something is torn, or which medicine you should take. Don\u2019t use PACE\u2019s workout suggestions to assess an injury. Please ask a qualified healthcare professional about the symptoms and medication question.";
    if (/\b(buy|purchase|checkout)\b|order groceries/i.test(message))
      return "I can help you review a shopping list in Eat \u2192 Groceries. FitLive does not place orders or spend money.";
    if (/\b(beer|alcohol|drunk|hangover)\b/i.test(message))
      return "I can\u2019t assess whether training is appropriate from that message. You can choose a rest day; you don\u2019t need to make up a missed session. PACE\u2019s recovery data does not measure alcohol\u2019s effects.";
    return null;
  }

  // apps/web/lib/habits.ts
  var bodyEntrySchema = external_exports.object({ date: external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => {
    const t = /* @__PURE__ */ new Date(d + "T12:00:00Z");
    return Number.isFinite(t.getTime()) && t.toISOString().slice(0, 10) === d;
  }), kg: external_exports.number().min(25).max(350), note: external_exports.string().max(300) });

  // apps/web/lib/planning.ts
  var prescription = external_exports.object({
    name: external_exports.string().min(1).max(100),
    exerciseId: external_exports.string().max(160).optional(),
    muscle: external_exports.string().min(1).max(40),
    sets: external_exports.number().int().min(1).max(6),
    minReps: external_exports.number().int().min(1).max(30),
    maxReps: external_exports.number().int().min(1).max(30),
    load: external_exports.number().min(0).max(300),
    increment: external_exports.number().min(0.5).max(5)
  }).refine((x) => x.maxReps >= x.minReps, "Rep range must be ordered");
  var programSchema = external_exports.object({
    name: external_exports.string().min(1).max(80),
    weekdays: external_exports.array(external_exports.number().int().min(0).max(6)).min(1).max(7).refine(
      (days) => new Set(days).size === days.length,
      "Choose each weekday once"
    ),
    sessions: external_exports.array(
      external_exports.object({
        name: external_exports.string().min(1).max(80),
        exercises: external_exports.array(prescription).min(1).max(10)
      })
    ).min(1).max(7)
  });
  var recipeSchema = external_exports.object({
    id: external_exports.string().min(1).max(100),
    name: external_exports.string().min(1).max(100),
    items: external_exports.array(
      external_exports.object({
        foodId: external_exports.string().min(1).max(100),
        grams: external_exports.number().min(1).max(2e3)
      })
    ).min(1).max(15).refine(
      (items) => new Set(items.map((i) => i.foodId)).size === items.length,
      "Combine duplicate ingredients"
    ),
    instructions: external_exports.string().max(2e3),
    rating: external_exports.number().int().min(-1).max(1)
  });
  var preferencesSchema = external_exports.object({
    loadUnit: external_exports.enum(["kg", "lb"]).optional(),
    aiConsent: external_exports.boolean(),
    theme: external_exports.enum(["light", "dark"]),
    weeklyBudget: external_exports.number().min(0).max(1e4),
    notifications: external_exports.boolean()
  });
  function defaults() {
    return {
      loadUnit: "lb",
      aiConsent: false,
      theme: "light",
      weeklyBudget: 100,
      notifications: false
    };
  }
  function foodLibrary(s) {
    const records = [
      ...s.mode === "demo" ? foods : [],
      ...s.meals.map((m) => m.food),
      ...s.savedFoods ?? []
    ];
    return [...new Map(records.map((f) => [f.id, f])).values()];
  }
  function recipes(s) {
    if (s.recipes?.length) return s.recipes;
    return s.mode === "demo" ? [
      {
        id: "demo-breakfast-bowl",
        name: "Yogurt, oats & berries",
        items: [
          { foodId: "sample-yogurt", grams: 200 },
          { foodId: "sample-oats", grams: 50 },
          { foodId: "sample-berries", grams: 80 }
        ],
        instructions: "Stir the oats into the yogurt. Add berries, and adjust the portion to your appetite.",
        rating: 0
      },
      {
        id: "demo-tofu-bowl",
        name: "Tofu & brown rice bowl",
        items: [
          { foodId: "sample-tofu", grams: 180 },
          { foodId: "sample-rice", grams: 150 }
        ],
        instructions: "Warm the cooked rice and prepare tofu as preferred. Any oil or sauces should be logged separately.",
        rating: 0
      }
    ] : [];
  }
  function recipeDetails(s, recipe) {
    const library = foodLibrary(s);
    const items = recipe.items.map((i) => ({
      ...i,
      food: library.find((f) => f.id === i.foodId)
    }));
    const valid = recipe.rating !== -1 && items.every((i) => i.food && allowed(i.food, s.profile));
    const total = items.reduce(
      (sum, i) => {
        if (i.food)
          for (const k of ["kcal", "protein", "carbs", "fat", "fiber"])
            sum[k] += i.food[k] * i.grams / 100;
        return sum;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
    const missing = items.flatMap((i) => {
      const pantry = s.pantry.find(
        (p) => p.unit === "g" && p.name.toLowerCase() === i.food?.name.toLowerCase()
      );
      const needed = Math.max(0, i.grams - (pantry?.quantity ?? 0));
      return needed ? [
        {
          foodId: i.foodId,
          name: i.food?.name ?? "Unavailable food",
          grams: needed
        }
      ] : [];
    });
    return {
      recipe,
      items,
      valid,
      total,
      missing,
      pantryReady: missing.length === 0
    };
  }
  function shoppingNeeds(s, from = dateKey(/* @__PURE__ */ new Date(), s.profile.timezone)) {
    const needs = /* @__PURE__ */ new Map();
    for (const p of (s.mealPlans ?? []).filter((p2) => p2.date >= from)) {
      const recipe = recipes(s).find((r) => r.id === p.recipeId);
      if (!recipe) continue;
      const details = recipeDetails(s, recipe);
      if (!details.valid) continue;
      for (const i of details.items) {
        if (!i.food) continue;
        const old = needs.get(i.foodId);
        needs.set(i.foodId, {
          id: i.foodId,
          name: i.food.name,
          quantity: (old?.quantity ?? 0) + i.grams,
          checked: false
        });
      }
    }
    return [...needs.values()].map((n) => ({
      ...n,
      quantity: Math.max(
        0,
        n.quantity - (s.pantry.find(
          (p) => p.unit === "g" && p.name.toLowerCase() === n.name.toLowerCase()
        )?.quantity ?? 0)
      )
    })).filter((n) => n.quantity > 0);
  }

  // apps/web/lib/grocery.ts
  var cartItemsSchema = external_exports.array(external_exports.object({ foodId: external_exports.string().min(1).max(100), grams: external_exports.number().min(1).max(1e5), estimateCents: external_exports.number().int().min(0).max(1e6) })).min(1).max(40);
  var cartSchema = external_exports.object({ id: external_exports.string(), createdAt: external_exports.string().datetime(), items: cartItemsSchema, policy: external_exports.string(), status: external_exports.enum(["draft", "approved"]), approvedAt: external_exports.string().datetime().optional() });
  function cartPolicy(s) {
    return JSON.stringify({ diet: s.profile.diet, allergies: s.profile.allergies, dislikes: s.profile.dislikes, budget: s.preferences?.weeklyBudget ?? 100 });
  }
  function checkCart(s, items) {
    const library = foodLibrary(s), issues = [];
    if (new Set(items.map((i) => i.foodId)).size !== items.length) issues.push("Combine duplicate foods before review.");
    for (const item of items) {
      const food = library.find((f) => f.id === item.foodId);
      if (!food || !allowed(food, s.profile) || s.mode === "real" && food.source.startsWith("Demo")) issues.push("A food is missing or conflicts with your dietary restrictions.");
    }
    const total = items.reduce((a, i) => a + i.estimateCents, 0), budget = Math.round((s.preferences?.weeklyBudget ?? 100) * 100);
    if (total > budget) issues.push("The estimated total exceeds your weekly budget.");
    return { total, budget, issues };
  }

  // apps/web/lib/domain.ts
  var foodSchema = external_exports.object({
    id: external_exports.string().max(100),
    name: external_exports.string().min(1).max(120),
    kcal: external_exports.number().min(0).max(1e3),
    protein: external_exports.number().min(0).max(100),
    carbs: external_exports.number().min(0).max(100),
    fat: external_exports.number().min(0).max(100),
    fiber: external_exports.number().min(0).max(100),
    vegan: external_exports.boolean(),
    vegetarian: external_exports.boolean(),
    allergens: external_exports.array(external_exports.string().max(40)).max(30),
    source: external_exports.string().max(180)
  });
  var num = (min, max) => external_exports.number().finite().min(min).max(max);
  var text = external_exports.string().max(500);
  var calendarDate = external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const d = /* @__PURE__ */ new Date(value + "T12:00:00Z");
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value;
  }, "Use a valid calendar date");
  var commandSchema = external_exports.discriminatedUnion("type", [
    external_exports.object({ type: external_exports.literal("body-entry"), entry: bodyEntrySchema }),
    external_exports.object({ type: external_exports.literal("body-delete"), date: calendarDate }),
    external_exports.object({ type: external_exports.literal("cart-preview"), items: cartItemsSchema }),
    external_exports.object({ type: external_exports.literal("cart-approve"), id: external_exports.string() }),
    external_exports.object({ type: external_exports.literal("exercise-create"), exercise: exerciseSchema }),
    external_exports.object({ type: external_exports.literal("exercise-match"), legacyId: external_exports.string(), targetId: external_exports.string() }),
    external_exports.object({ type: external_exports.literal("exercise-migrate") }),
    external_exports.object({ type: external_exports.literal("meal-batch"), items: external_exports.array(external_exports.object({ food: foodSchema, grams: num(1, 2e3) })).min(1).max(8) }),
    external_exports.object({ type: external_exports.literal("program"), program: programSchema }),
    external_exports.object({ type: external_exports.literal("preferences"), preferences: preferencesSchema }),
    external_exports.object({ type: external_exports.literal("save-food"), food: foodSchema }),
    external_exports.object({ type: external_exports.literal("recipe"), recipe: recipeSchema }),
    external_exports.object({
      type: external_exports.literal("recipe-rating"),
      id: external_exports.string(),
      rating: external_exports.number().int().min(-1).max(1)
    }),
    external_exports.object({
      type: external_exports.literal("plan-meal"),
      id: external_exports.string(),
      recipeId: external_exports.string(),
      date: calendarDate
    }),
    external_exports.object({ type: external_exports.literal("unplan-meal"), id: external_exports.string() }),
    external_exports.object({
      type: external_exports.literal("log-recipe"),
      id: external_exports.string(),
      deductPantry: external_exports.boolean()
    }),
    external_exports.object({
      type: external_exports.literal("profile"),
      profile: external_exports.object({
        name: external_exports.string().min(1).max(60),
        diet: external_exports.enum(["omnivore", "vegetarian", "vegan"]),
        allergies: external_exports.array(external_exports.string().min(1).max(40)).max(30),
        dislikes: external_exports.array(external_exports.string().max(60)).max(40),
        goal: external_exports.enum(["Build muscle", "Get stronger", "Maintain fitness"]),
        days: num(1, 7).int(),
        equipment: external_exports.enum(["Full gym", "Dumbbells", "Bodyweight"]),
        protein: num(20, 300),
        calories: num(1200, 5e3),
        timezone: external_exports.string().max(80),
        consent: external_exports.literal(true)
      })
    }),
    external_exports.object({
      type: external_exports.literal("checkin"),
      energy: num(1, 5).int(),
      soreness: num(1, 5).int(),
      motivation: num(1, 5).int(),
      note: text
    }),
    external_exports.object({
      type: external_exports.literal("workout"),
      date: calendarDate.optional(),
      sets: external_exports.array(
        external_exports.object({
          exercise: external_exports.string().min(1).max(100),
          exerciseId: external_exports.string().max(160).optional(),
          muscle: external_exports.string().max(50),
          reps: num(1, 100).int(),
          load: num(0, 500),
          rpe: num(1, 10).optional()
        })
      ).min(1).max(80),
      effort: external_exports.enum(["About right", "Too hard", "Too easy"]),
      status: external_exports.enum(["completed", "partial"])
    }),
    external_exports.object({
      type: external_exports.literal("meal"),
      food: foodSchema,
      grams: num(1, 2e3),
      pantryId: external_exports.string().optional()
    }),
    external_exports.object({
      type: external_exports.literal("pantry"),
      id: external_exports.string().max(100),
      name: external_exports.string().min(1).max(100),
      quantity: num(0, 1e5),
      unit: external_exports.enum(["g", "ml", "servings"]),
      confidence: external_exports.enum(["high", "medium", "low"])
    }),
    external_exports.object({ type: external_exports.literal("pantry-delete"), id: external_exports.string() }),
    external_exports.object({
      type: external_exports.literal("feedback"),
      feedback: external_exports.enum(["accepted", "modified", "rejected"]),
      note: text
    }),
    external_exports.object({
      type: external_exports.literal("health"),
      samples: external_exports.array(
        external_exports.object({
          id: external_exports.string().min(1).max(120),
          date: calendarDate,
          sleep: num(0, 1440),
          rhr: num(20, 250).nullable(),
          hrv: num(0, 500).nullable(),
          source: external_exports.enum(["manual", "HealthKit"]),
          sampleAt: external_exports.string().datetime(),
          syncAt: external_exports.string().datetime()
        })
      ).min(1).max(100)
    }),
    external_exports.object({ type: external_exports.literal("grocery-generate") }),
    external_exports.object({
      type: external_exports.literal("grocery-check"),
      id: external_exports.string(),
      checked: external_exports.boolean()
    }),
    external_exports.object({ type: external_exports.literal("mode"), mode: external_exports.enum(["demo", "real"]) }),
    external_exports.object({ type: external_exports.literal("delete"), confirmation: external_exports.literal("DELETE") }),
    external_exports.object({ type: external_exports.literal("chat"), message: external_exports.string().min(1).max(1e3) })
  ]);
  var dateKey = (now = /* @__PURE__ */ new Date(), tz = "America/Chicago") => new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
  function blank() {
    return {
      mode: "real",
      profile: {
        name: "You",
        diet: "vegetarian",
        allergies: [],
        dislikes: [],
        goal: "Build muscle",
        days: 3,
        equipment: "Full gym",
        protein: 145,
        calories: 2300,
        timezone: "America/Chicago",
        consent: false
      },
      health: [],
      checkins: [],
      workouts: [],
      meals: [],
      pantry: [],
      audit: [],
      grocery: [],
      messages: [],
      onboarded: false,
      preferences: defaults(),
      recipes: [],
      savedFoods: [],
      mealPlans: [],
      consentHistory: []
    };
  }
  var foods = [
    {
      id: "sample-yogurt",
      name: "Plain Greek yogurt",
      kcal: 59,
      protein: 10.3,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      vegan: false,
      vegetarian: true,
      allergens: ["milk"],
      source: "Demo nutrient fixture \xB7 per 100 g"
    },
    {
      id: "sample-oats",
      name: "Rolled oats, dry",
      kcal: 379,
      protein: 13.2,
      carbs: 67.7,
      fat: 6.5,
      fiber: 10.1,
      vegan: true,
      vegetarian: true,
      allergens: ["oats", "gluten"],
      source: "Demo nutrient fixture \xB7 per 100 g"
    },
    {
      id: "sample-tofu",
      name: "Firm tofu",
      kcal: 144,
      protein: 17.3,
      carbs: 2.8,
      fat: 8.7,
      fiber: 2.3,
      vegan: true,
      vegetarian: true,
      allergens: ["soy"],
      source: "Demo nutrient fixture \xB7 per 100 g"
    },
    {
      id: "sample-rice",
      name: "Brown rice, cooked",
      kcal: 123,
      protein: 2.7,
      carbs: 25.6,
      fat: 1,
      fiber: 1.6,
      vegan: true,
      vegetarian: true,
      allergens: [],
      source: "Demo nutrient fixture \xB7 per 100 g"
    },
    {
      id: "sample-berries",
      name: "Blueberries",
      kcal: 57,
      protein: 0.7,
      carbs: 14.5,
      fat: 0.3,
      fiber: 2.4,
      vegan: true,
      vegetarian: true,
      allergens: [],
      source: "Demo nutrient fixture \xB7 per 100 g"
    }
  ];
  function seed(now = /* @__PURE__ */ new Date()) {
    const s = blank();
    s.mode = "demo";
    s.profile = { ...s.profile, name: "Kiran", consent: true };
    s.onboarded = true;
    for (let i = 28; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 864e5);
      const date = dateKey(d);
      s.health.push({
        id: `demo-${date}`,
        date,
        sleep: i === 0 ? 322 : 420 + i * 7 % 37,
        rhr: i === 0 ? 64 : 57 + i % 3,
        hrv: i === 0 ? 37 : 47 + i % 8,
        source: "demo",
        sampleAt: d.toISOString(),
        syncAt: d.toISOString()
      });
      if (i > 0 && i % 2 === 0) {
        s.workouts.push({
          id: `demo-w-${i}`,
          date,
          status: "completed",
          effort: "About right",
          sets: [8, 10, 12].map((reps) => ({
            exercise: ["Goblet squat", "Dumbbell floor press", "Dumbbell row"][Math.floor(i / 2) % 3],
            muscle: ["Quads", "Chest", "Back"][Math.floor(i / 2) % 3],
            reps,
            load: 20 + (28 - i) * 0.25,
            rpe: 8
          }))
        });
      }
      if (i > 0) {
        s.meals.push(
          { id: `demo-m-${i}`, date, food: foods[2], grams: i % 3 === 0 ? 600 : 450, pantryId: "p-tofu" },
          { id: `demo-y-${i}`, date, food: foods[0], grams: 350, pantryId: "p-yogurt" },
          { id: `demo-o-${i}`, date, food: foods[1], grams: 80, pantryId: "p-oats" },
          { id: `demo-b-${i}`, date, food: foods[4], grams: 60, pantryId: "p-berries" },
          { id: `demo-r-${i}`, date, food: foods[3], grams: 250 }
        );
      }
    }
    s.checkins = [
      { date: dateKey(now), energy: 2, soreness: 3, motivation: 3, note: "" }
    ];
    s.pantry = [
      {
        id: "p-yogurt",
        name: "Plain Greek yogurt",
        quantity: 300,
        unit: "g",
        confidence: "high",
        confirmed: now.toISOString()
      },
      {
        id: "p-oats",
        name: "Rolled oats, dry",
        quantity: 600,
        unit: "g",
        confidence: "medium",
        confirmed: now.toISOString()
      },
      {
        id: "p-tofu",
        name: "Firm tofu",
        quantity: 400,
        unit: "g",
        confidence: "high",
        confirmed: now.toISOString()
      },
      {
        id: "p-berries",
        name: "Blueberries",
        quantity: 80,
        unit: "g",
        confidence: "medium",
        confirmed: now.toISOString()
      }
    ];
    s.meals.push(
      { id: "demo-breakfast", date: dateKey(now), food: foods[0], grams: 200 },
      { id: "demo-oats", date: dateKey(now), food: foods[1], grams: 60 }
    );
    s.grocery = forecast(s, now).filter((p) => p.low).map((p) => ({ id: p.id, name: p.name, quantity: p.unit === "g" ? 500 : 1, checked: false }));
    return s;
  }
  var mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
  function recovery(s, now = /* @__PURE__ */ new Date()) {
    const day = dateKey(now, s.profile.timezone);
    const h = s.health.filter((h2) => h2.date <= day).sort((a, b) => b.date.localeCompare(a.date))[0];
    const history = s.health.filter(
      (x) => h && x.date < h.date && x.date >= dateKey(
        new Date((/* @__PURE__ */ new Date(h.date + "T12:00:00Z")).getTime() - 28 * 864e5),
        "UTC"
      )
    );
    const baseline = {
      sleep: mean(history.map((x) => x.sleep)),
      rhr: mean(history.flatMap((x) => x.rhr === null ? [] : [x.rhr])),
      hrv: mean(history.flatMap((x) => x.hrv === null ? [] : [x.hrv]))
    };
    const check = s.checkins.find((x) => x.date === day);
    const stale = !h || now.getTime() - Date.parse(h.sampleAt) > 36 * 36e5 || h.date !== day;
    const rules = [];
    const reasons = [];
    if (h && !stale && history.length >= 7) {
      if (baseline.sleep !== null && h.sleep < baseline.sleep - 60) {
        rules.push("SLEEP_BELOW_BASELINE");
        reasons.push("Sleep was more than an hour below your recent baseline.");
      }
      if (h.rhr !== null && baseline.rhr !== null && h.rhr > baseline.rhr + 5) {
        rules.push("RHR_ABOVE_BASELINE");
        reasons.push("Resting heart rate was above your recent range.");
      }
      if (h.hrv !== null && baseline.hrv !== null && h.hrv < baseline.hrv * 0.8) {
        rules.push("HRV_BELOW_BASELINE");
        reasons.push("HRV was lower than your recent average.");
      }
    }
    if (check && (check.energy <= 2 || check.soreness >= 4)) {
      rules.push("SUBJECTIVE_FATIGUE");
      reasons.push("Your check-in suggests leaving a little more in reserve.");
    }
    const reduced = rules.length >= 2;
    const confidence = stale || history.length < 7 ? "Low" : history.length >= 21 && h?.hrv !== null && check ? "Medium" : "Low";
    if (stale)
      reasons.push(
        "Current health data is missing or stale; no wearable-based adjustment is applied."
      );
    if (history.length < 7)
      reasons.push(
        "At least seven prior days are needed for a personal baseline."
      );
    if (!reasons.length)
      reasons.push(
        "Available signals do not justify changing your planned intensity."
      );
    return {
      band: reduced ? "Reduced" : "Normal",
      confidence,
      reasons,
      rules,
      baseline,
      days: history.length,
      latest: h,
      stale,
      adjustment: reduced ? 0.9 : 1,
      avoidFailure: reduced
    };
  }
  function allowed(food, p) {
    const norm = (x) => x.toLowerCase().trim();
    const aliases = {
      dairy: "milk",
      soya: "soy",
      peanuts: "peanut",
      eggs: "egg",
      nuts: "tree nut"
    };
    const normalize = (x) => aliases[norm(x)] ?? norm(x);
    if (p.diet === "vegan" && !food.vegan || p.diet === "vegetarian" && !food.vegetarian)
      return false;
    return !p.allergies.some(
      (a) => food.allergens.some((x) => normalize(x) === normalize(a)) || norm(food.name).includes(norm(a))
    ) && !p.dislikes.some((a) => norm(a) && norm(food.name).includes(norm(a)));
  }
  function totals(s, day = dateKey(/* @__PURE__ */ new Date(), s.profile.timezone)) {
    return s.meals.filter((m) => m.date === day).reduce(
      (a, m) => {
        for (const k of ["kcal", "protein", "carbs", "fat", "fiber"])
          a[k] += m.food[k] * m.grams / 100;
        return a;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  }
  function progression(s, exercise, base = 20, now = /* @__PURE__ */ new Date()) {
    const recent = s.workouts.filter((w) => w.sets.some((x) => sameExercise(x, exercise))).sort((a, b) => b.date.localeCompare(a.date));
    const last = recent[0];
    if (!last)
      return {
        load: base,
        reason: "Start with a comfortable load; keep two or more reps in reserve."
      };
    const sets = last.sets.filter((x) => sameExercise(x, exercise));
    const load = Math.max(...sets.map((x) => x.load));
    if (now.getTime() - Date.parse(last.date + "T12:00:00Z") > 14 * 864e5)
      return {
        load: Math.round(load * 0.9 * 2) / 2,
        reason: "After a break of over two weeks, start lighter and rebuild gradually."
      };
    if (last.effort === "Too hard" || recent.length >= 2 && recent.slice(0, 2).every(
      (w) => w.sets.filter((x) => sameExercise(x, exercise)).some((x) => x.reps < 8)
    ))
      return {
        load: Math.round(load * 0.9 * 2) / 2,
        reason: "Recent difficulty suggests a small reduction before progressing."
      };
    if (last.status === "completed" && sets.length >= 3 && sets.every((x) => x.reps >= 12 && (x.rpe === void 0 || x.rpe <= 8)))
      return {
        load: load + 2.5,
        reason: "All three working sets reached 12 reps without high effort recorded. Add 2.5 kg."
      };
    return {
      load,
      reason: "Keep the load and build toward three sets of 12 controlled reps."
    };
  }
  function sessionName(s) {
    if (s.program?.sessions.length)
      return s.program.sessions[s.workouts.filter((w) => w.status === "completed").length % s.program.sessions.length].name;
    return ["Legs & core", "Push & shoulders", "Pull & posterior"][s.workouts.filter((w) => w.status === "completed").length % 3];
  }
  function plan(s, now = /* @__PURE__ */ new Date()) {
    if (s.program?.sessions.length) {
      const session = s.program.sessions[s.workouts.filter((w) => w.status === "completed").length % s.program.sessions.length];
      const recoveryContext = recovery(s, now);
      return session.exercises.map((x) => {
        const previous = [...s.workouts].sort((a, b) => b.date.localeCompare(a.date)).find(
          (w) => w.status === "completed" && w.sets.some((a) => sameExercise(a, x.name, x.exerciseId))
        );
        const sets = previous?.sets.filter((a) => sameExercise(a, x.name, x.exerciseId)) ?? [];
        const lastLoad = sets.length ? Math.max(...sets.map((a) => a.load)) : x.load;
        const advance = sets.length >= x.sets && sets.every((a) => a.reps >= x.maxReps && (a.rpe === void 0 || a.rpe <= 8));
        const returning = previous && now.getTime() - Date.parse(previous.date + "T12:00:00Z") > 14 * 864e5;
        const hard = previous?.effort === "Too hard" || returning;
        const load = hard ? lastLoad * 0.9 : advance ? lastLoad + x.increment : lastLoad;
        return {
          name: x.name,
          exerciseId: x.exerciseId,
          muscle: x.muscle,
          base: x.load,
          sets: x.sets,
          reps: `${x.minReps}\u2013${x.maxReps}`,
          load: Math.round(load * recoveryContext.adjustment * 2) / 2,
          reason: returning ? "After a break of over two weeks, rebuild with a lighter load." : hard ? "Last session felt too hard; rebuild with a lighter load." : advance ? "Your completed sets earned the configured increment." : "Build toward the top of your chosen rep range."
        };
      });
    }
    const r = recovery(s, now), body = s.profile.equipment === "Bodyweight";
    const rotation = s.workouts.filter((w) => w.status === "completed").length % 3;
    const routines = [
      [
        {
          name: body ? "Bodyweight squat" : "Goblet squat",
          muscle: "Quads",
          base: 20
        },
        {
          name: body ? "Glute bridge" : "Romanian deadlift",
          muscle: "Hamstrings",
          base: 30
        },
        { name: "Reverse lunge", muscle: "Quads", base: 10 }
      ],
      [
        {
          name: body ? "Push-up" : "Dumbbell floor press",
          muscle: "Chest",
          base: 15
        },
        {
          name: body ? "Pike push-up" : "Dumbbell shoulder press",
          muscle: "Shoulders",
          base: 10
        },
        {
          name: body ? "Close-grip push-up" : "Triceps extension",
          muscle: "Triceps",
          base: 7.5
        }
      ],
      [
        {
          name: body ? "Prone Y raise" : "Dumbbell row",
          muscle: "Back",
          base: 15
        },
        {
          name: body ? "Bird dog" : "Dumbbell reverse fly",
          muscle: "Back",
          base: 5
        },
        {
          name: body ? "Glute bridge" : "Dumbbell curl",
          muscle: body ? "Glutes" : "Biceps",
          base: 10
        }
      ]
    ];
    return routines[rotation].map((x) => {
      const p = progression(s, x.name, body ? 0 : x.base, now);
      return {
        ...x,
        ...p,
        exerciseId: exerciseIdentity(x.name),
        load: body ? 0 : Math.round(p.load * r.adjustment * 2) / 2,
        sets: 3,
        reps: "8\u201312"
      };
    });
  }
  function forecast(s, now = /* @__PURE__ */ new Date()) {
    return s.pantry.map((p) => {
      const since = dateKey(
        new Date(now.getTime() - 7 * 864e5),
        s.profile.timezone
      );
      const used = s.meals.filter((m) => m.pantryId === p.id && m.date >= since).reduce((a, m) => a + m.grams, 0);
      const rate = p.unit === "g" && used > 0 ? used / 7 : null;
      return {
        ...p,
        days: rate ? Math.floor(p.quantity / rate) : null,
        low: p.quantity === 0 || rate !== null && p.quantity / rate < 3 || p.unit === "g" && p.quantity < 150,
        rate
      };
    });
  }
  function groceryList(s, now = /* @__PURE__ */ new Date()) {
    const list = s.grocery.map((x) => ({ ...x }));
    const suggestions = [...forecast(s, now).filter((p) => p.low).map((p) => ({ id: p.id, name: p.name, quantity: p.unit === "g" ? 500 : 1, checked: false })), ...shoppingNeeds(s, dateKey(now, s.profile.timezone))];
    for (const item of suggestions) if (!list.some((x) => x.name.toLowerCase() === item.name.toLowerCase())) list.push(item);
    return list;
  }
  function scheduledToday(s, now = /* @__PURE__ */ new Date()) {
    if (!s.program) return true;
    const weekday = (/* @__PURE__ */ new Date(
      dateKey(now, s.profile.timezone) + "T12:00:00Z"
    )).getUTCDay();
    return s.program.weekdays.includes(weekday);
  }
  function recommendation(s, now = /* @__PURE__ */ new Date()) {
    const r = recovery(s, now), day = dateKey(now, s.profile.timezone);
    const done = s.workouts.some(
      (w) => w.date === day && w.status === "completed"
    );
    const rejected = [...s.audit].reverse().find(
      (a) => a.feedback && dateKey(new Date(a.at), s.profile.timezone) === day
    )?.feedback === "rejected";
    return {
      title: !done && !scheduledToday(s, now) ? "A planned day to recover." : done ? "You put in the work. Now refuel." : rejected ? "Make today a recovery day." : r.band === "Reduced" ? "Keep your rhythm. Ease the intensity." : "A steady day to build on.",
      action: !done && !scheduledToday(s, now) ? "Review your recovery" : done ? "Plan your next meal" : rejected ? "Review your recovery" : "Review today\u2019s session",
      target: done ? "Eat" : rejected || !scheduledToday(s, now) ? "Today" : "Train",
      text: !done && !scheduledToday(s, now) ? "Your schedule has a rest day today. Keep movement comfortable; your next session stays ready in Train." : done ? `${Math.max(0, Math.round(s.profile.protein - totals(s, day).protein))} g of your protein target remains. Choose a meal that fits your appetite and preferences.` : rejected ? "You chose to skip the recommendation. Your feedback is saved; take a comfortable recovery day." : r.band === "Reduced" ? "Several signals suggest easing the load. Keep today\u2019s session controlled, with a little more in reserve." : "Follow the plan at a comfortable effort. Your own readiness matters as much as the numbers.",
      ...r
    };
  }
  function coach(s, message, now = /* @__PURE__ */ new Date()) {
    const m = message.toLowerCase();
    const boundary = coachBoundary(message);
    if (boundary) return boundary;
    if (/food|eat|protein|meal|pantry|logged today/.test(m)) {
      const t = totals(s, dateKey(now, s.profile.timezone));
      const candidates = foods.filter(
        (f) => allowed(f, s.profile) && s.pantry.some((p) => p.name === f.name && p.quantity > 0)
      );
      if (!s.meals.some((x) => x.date === dateKey(now, s.profile.timezone))) return "No meals are recorded today, so I don\u2019t know your intake. Log a meal in Eat to see recorded nutrition totals.";
      return `You have logged ${Math.round(t.protein)} g protein against your ${s.profile.protein} g target today. ${candidates.length ? "Your pantry includes " + candidates.map((x) => x.name.toLowerCase()).join(", ") + ". Review portions in Eat before logging." : "Add pantry items or search a verified food record in Eat."} ${s.mode === "demo" ? "These are demo nutrient fixtures." : ""}`;
    }
    if (!/workout|train|session|recover|sleep|readiness|rest|exercise|plan/i.test(m)) return "I\u2019m PACE, your training, recovery and food guide. I can\u2019t answer that from your FitLive records. Try \u2018Why this workout?\u2019, \u2018What have I logged today?\u2019 or \u2018How much protein have I logged?\u2019";
    const r = recovery(s, now);
    return `Recovery context is ${r.band.toLowerCase()}, with ${r.confidence.toLowerCase()} confidence. ${r.reasons.join(" ")} ${plan(s, now)[0].reason} This response uses your saved state and versioned rules; no AI provider is connected.`;
  }
  function apply(state, input, id, version, now = /* @__PURE__ */ new Date(), generated) {
    const c = commandSchema.parse(input);
    if (c.type === "delete") return blank();
    if (c.type === "mode") return c.mode === "demo" ? seed(now) : blank();
    const s = migrateExercises(state), day = dateKey(now, s.profile.timezone);
    switch (c.type) {
      case "exercise-migrate":
        break;
      case "exercise-match":
        confirmExerciseMatch(s, c.legacyId, c.targetId);
        break;
      case "exercise-create": {
        if (!c.exercise.id.startsWith("custom:")) throw new Error("Custom exercise ID required");
        const match = exerciseMatches(c.exercise.name, s.customExercises)[0];
        if (match && match.score >= 0.9) throw new Error(`Use the existing exercise: ${match.exercise.name}`);
        if (s.customExercises?.some((x) => x.id === c.exercise.id)) throw new Error("Exercise ID already exists");
        s.customExercises = [...s.customExercises ?? [], c.exercise];
        break;
      }
      case "body-entry":
        if (c.entry.date > day) throw new Error("Measurement date cannot be in the future.");
        s.bodyEntries = [...(s.bodyEntries ?? []).filter((e) => e.date !== c.entry.date), c.entry];
        break;
      case "body-delete":
        s.bodyEntries = (s.bodyEntries ?? []).filter((e) => e.date !== c.date);
        break;
      case "cart-preview":
        s.cart = { id, createdAt: now.toISOString(), items: c.items, policy: cartPolicy(s), status: "draft" };
        break;
      case "cart-approve": {
        if (!s.cart || s.cart.id !== c.id || s.cart.policy !== cartPolicy(s)) throw new Error("Cart changed. Prepare a new review.");
        const check = checkCart(s, s.cart.items);
        if (check.issues.length) throw new Error(check.issues.join(" "));
        s.cart = { ...s.cart, status: "approved", approvedAt: now.toISOString() };
        break;
      }
      case "meal-batch":
        for (const [i, item] of c.items.entries()) {
          const updated = apply(s, { type: "meal", ...item }, id + ":" + i, version, now);
          s.meals = updated.meals;
        }
        break;
      case "program":
        for (const session of c.program.sessions) for (const item of session.exercises) if (item.exerciseId) {
          const entry = [...catalogue, ...s.customExercises ?? []].find((e) => e.id === item.exerciseId);
          if (!entry || entry.modality !== "strength") throw new Error("Choose a supported exercise");
          item.name = entry.name;
          item.muscle = entry.primaryMuscles[0];
          item.increment = entry.increment;
        }
        s.program = c.program;
        s.profile.days = new Set(c.program.weekdays).size;
        break;
      case "preferences":
        s.preferences = c.preferences;
        s.consentHistory = [
          ...s.consentHistory ?? [],
          { at: now.toISOString(), ai: c.preferences.aiConsent }
        ];
        break;
      case "save-food":
        if (!allowed(c.food, s.profile))
          throw new Error("This food conflicts with your dietary restrictions.");
        s.savedFoods = [
          ...(s.savedFoods ?? []).filter((f) => f.id !== c.food.id),
          c.food
        ];
        break;
      case "recipe": {
        const library = foodLibrary(s);
        if (!c.recipe.items.every(
          (i) => library.some((f) => f.id === i.foodId && allowed(f, s.profile))
        ))
          throw new Error(
            "Recipe conflicts with your dietary restrictions or contains an unavailable food."
          );
        s.recipes = [...recipes(s).filter((r) => r.id !== c.recipe.id), c.recipe];
        break;
      }
      case "recipe-rating":
        s.recipes = recipes(s).map(
          (r) => r.id === c.id ? { ...r, rating: c.rating } : r
        );
        break;
      case "plan-meal": {
        const recipe = recipes(s).find((r) => r.id === c.recipeId);
        if (!recipe || !recipeDetails(s, recipe).valid)
          throw new Error("Recipe conflicts with your dietary restrictions.");
        s.mealPlans = [
          ...(s.mealPlans ?? []).filter((p) => p.id !== c.id),
          { id: c.id, date: c.date, recipeId: c.recipeId }
        ];
        break;
      }
      case "unplan-meal":
        s.mealPlans = (s.mealPlans ?? []).filter((p) => p.id !== c.id);
        break;
      case "log-recipe": {
        const recipe = recipes(s).find((r) => r.id === c.id);
        if (!recipe) throw new Error("Recipe not found.");
        const details = recipeDetails(s, recipe);
        if (!details.valid)
          throw new Error("Recipe conflicts with dietary restrictions.");
        for (const [i, item] of details.items.entries()) {
          const food = item.food;
          if (s.mode === "real" && food.source.startsWith("Demo"))
            throw new Error("Use a verified food record.");
          const pantry = s.pantry.find(
            (p) => p.unit === "g" && p.name.toLowerCase() === food.name.toLowerCase()
          );
          if (c.deductPantry) {
            if (!pantry || pantry.quantity < item.grams)
              throw new Error("Confirm sufficient pantry quantity first.");
            pantry.quantity -= item.grams;
            pantry.confidence = "medium";
          }
          s.meals.push({
            id: id + ":" + i,
            date: day,
            food,
            grams: item.grams,
            ...c.deductPantry ? { pantryId: pantry.id } : {}
          });
        }
        break;
      }
      case "profile":
        new Intl.DateTimeFormat("en", { timeZone: c.profile.timezone });
        s.profile = c.profile;
        s.onboarded = true;
        break;
      case "checkin":
        s.checkins = s.checkins.filter((x) => x.date !== day);
        s.checkins.push({ date: day, ...c });
        break;
      case "workout":
        if (c.date && c.date > day)
          throw new Error("Workout date cannot be in the future.");
        s.workouts.push({
          id,
          date: c.date ?? day,
          sets: c.sets.map((set) => {
            if (!set.exerciseId) return set;
            const entry = [...catalogue, ...s.customExercises ?? []].find((e) => e.id === set.exerciseId);
            if (!entry || entry.modality !== "strength") throw new Error("Choose a supported exercise");
            return { ...set, exercise: entry.name, muscle: entry.primaryMuscles[0] };
          }),
          effort: c.effort,
          status: c.status
        });
        break;
      case "meal":
        if (c.food.id.startsWith("sample-")) {
          const canonical = foods.find((f) => f.id === c.food.id);
          if (!canonical) throw new Error("Use a verified food record.");
          c.food = canonical;
        }
        if (!allowed(c.food, s.profile))
          throw new Error("This food conflicts with your dietary restrictions.");
        if (s.mode === "real" && c.food.source.startsWith("Demo"))
          throw new Error(
            "Use a verified food record or a confirmed package label in real mode."
          );
        if (c.pantryId) {
          const p = s.pantry.find((x) => x.id === c.pantryId);
          if (!p || p.unit !== "g" || p.quantity < c.grams)
            throw new Error("Confirm sufficient pantry quantity in grams first.");
          if (p.name.toLowerCase() !== c.food.name.toLowerCase())
            throw new Error("Choose the matching pantry food.");
          p.quantity -= c.grams;
          p.confidence = "medium";
        }
        s.meals.push({
          id,
          date: day,
          food: c.food,
          grams: c.grams,
          pantryId: c.pantryId
        });
        break;
      case "pantry":
        s.pantry = s.pantry.filter((x) => x.id !== c.id);
        s.pantry.push({ ...c, confirmed: now.toISOString() });
        break;
      case "pantry-delete":
        s.pantry = s.pantry.filter((x) => x.id !== c.id);
        break;
      case "health":
        for (const sample of c.samples) {
          if (sample.date > day || Date.parse(sample.sampleAt) > now.getTime() + 3e5)
            throw new Error("Health samples cannot be in the future.");
          const old = s.health.find((x) => x.id === sample.id);
          if (old && JSON.stringify({ ...old, syncAt: "" }) !== JSON.stringify({ ...sample, syncAt: "" }))
            throw new Error("Conflicting health sample identifier.");
          if (!old) {
            s.health = s.health.filter((x) => x.date !== sample.date);
            s.health.push({ ...sample, syncAt: now.toISOString() });
          }
        }
        break;
      case "feedback": {
        const r = recommendation(s, now);
        s.audit.push({
          id,
          at: now.toISOString(),
          version,
          rules: r.rules,
          text: r.title,
          confidence: r.confidence,
          feedback: c.feedback,
          note: c.note
        });
        break;
      }
      case "grocery-generate":
        s.grocery = forecast(s, now).filter((p) => p.low).map((p) => ({
          id: p.id,
          name: p.name,
          quantity: p.unit === "g" ? 500 : 1,
          checked: false
        }));
        for (const need of shoppingNeeds(s, day)) {
          const item = s.grocery.find(
            (g) => g.name.toLowerCase() === need.name.toLowerCase()
          );
          if (item) item.quantity = Math.max(item.quantity, need.quantity);
          else s.grocery.push(need);
        }
        break;
      case "grocery-check": {
        s.grocery = groceryList(s, now);
        const item = s.grocery.find((x) => x.id === c.id);
        if (!item) throw new Error("Shopping item not found.");
        item.checked = c.checked;
        break;
      }
      case "chat":
        s.messages.push(
          { role: "user", text: c.message },
          {
            role: "assistant",
            text: generated?.text ?? coach(s, c.message, now),
            ...generated ? {
              provider: generated.provider,
              model: generated.model,
              tools: generated.tools,
              status: generated.status,
              action: generated.action
            } : { provider: "rules" }
          }
        );
        break;
    }
    if (!["feedback", "chat", "grocery-check"].includes(c.type)) {
      const r = recommendation(s, now);
      s.audit.push({
        id,
        at: now.toISOString(),
        version: version + 1,
        rules: r.rules,
        text: r.title,
        confidence: r.confidence
      });
    }
    return migrateExercises(s);
  }
  function validateSnapshot(value) {
    const s = external_exports.object({
      mode: external_exports.enum(["demo", "real"]),
      profile: external_exports.object({
        name: external_exports.string(),
        diet: external_exports.enum(["omnivore", "vegetarian", "vegan"]),
        allergies: external_exports.array(external_exports.string()),
        dislikes: external_exports.array(external_exports.string()),
        goal: external_exports.string(),
        days: num(1, 7),
        equipment: external_exports.string(),
        protein: num(20, 300),
        calories: num(1200, 5e3),
        timezone: external_exports.string(),
        consent: external_exports.boolean()
      }),
      health: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          date: calendarDate,
          sleep: num(0, 1440),
          rhr: num(20, 250).nullable(),
          hrv: num(0, 500).nullable(),
          source: external_exports.enum(["demo", "manual", "HealthKit"]),
          sampleAt: external_exports.string().datetime(),
          syncAt: external_exports.string().datetime()
        })
      ),
      checkins: external_exports.array(
        external_exports.object({
          date: calendarDate,
          energy: num(1, 5),
          soreness: num(1, 5),
          motivation: num(1, 5),
          note: external_exports.string()
        })
      ),
      workouts: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          date: calendarDate,
          sets: external_exports.array(
            external_exports.object({
              exercise: external_exports.string(),
              exerciseId: external_exports.string().max(160).optional(),
              muscle: external_exports.string(),
              reps: num(1, 100),
              load: num(0, 500),
              rpe: num(1, 10).optional()
            })
          ),
          effort: external_exports.string(),
          status: external_exports.enum(["completed", "partial"])
        })
      ),
      meals: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          date: calendarDate,
          food: foodSchema,
          grams: num(1, 2e3),
          pantryId: external_exports.string().optional()
        })
      ),
      pantry: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          name: external_exports.string(),
          quantity: num(0, 1e5),
          unit: external_exports.string(),
          confirmed: external_exports.string(),
          confidence: external_exports.enum(["high", "medium", "low"])
        })
      ),
      audit: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          at: external_exports.string().datetime(),
          version: external_exports.number(),
          rules: external_exports.array(external_exports.string()),
          text: external_exports.string(),
          confidence: external_exports.string(),
          feedback: external_exports.string().optional(),
          note: external_exports.string().optional()
        })
      ),
      grocery: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          name: external_exports.string(),
          quantity: external_exports.number(),
          checked: external_exports.boolean()
        })
      ),
      messages: external_exports.array(
        external_exports.object({
          role: external_exports.enum(["user", "assistant"]),
          text: external_exports.string(),
          provider: external_exports.string().optional(),
          model: external_exports.string().nullable().optional(),
          tools: external_exports.array(external_exports.string()).optional(),
          status: external_exports.string().optional(),
          action: external_exports.string().optional()
        })
      ),
      onboarded: external_exports.boolean(),
      program: programSchema.optional(),
      customExercises: external_exports.array(exerciseSchema).optional(),
      exerciseMatches: external_exports.array(external_exports.object({ legacyId: external_exports.string(), name: external_exports.string(), candidateId: external_exports.string(), score: external_exports.number() })).optional(),
      exerciseCatalogueVersion: external_exports.number().optional(),
      cart: cartSchema.optional(),
      bodyEntries: external_exports.array(bodyEntrySchema).optional(),
      savedFoods: external_exports.array(foodSchema).optional(),
      recipes: external_exports.array(recipeSchema).optional(),
      mealPlans: external_exports.array(
        external_exports.object({
          id: external_exports.string(),
          date: calendarDate,
          recipeId: external_exports.string()
        })
      ).optional(),
      preferences: preferencesSchema.optional(),
      consentHistory: external_exports.array(external_exports.object({ at: external_exports.string(), ai: external_exports.boolean() })).optional()
    }).parse(value);
    dateKey(/* @__PURE__ */ new Date(), s.profile.timezone);
    return s;
  }
  return __toCommonJS(domain_exports);
})();
