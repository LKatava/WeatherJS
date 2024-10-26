var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../node_modules/flatbuffers/js/constants.js
var require_constants = __commonJS({
  "../node_modules/flatbuffers/js/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SIZE_PREFIX_LENGTH = exports.FILE_IDENTIFIER_LENGTH = exports.SIZEOF_INT = exports.SIZEOF_SHORT = void 0;
    exports.SIZEOF_SHORT = 2;
    exports.SIZEOF_INT = 4;
    exports.FILE_IDENTIFIER_LENGTH = 4;
    exports.SIZE_PREFIX_LENGTH = 4;
  }
});

// ../node_modules/flatbuffers/js/utils.js
var require_utils = __commonJS({
  "../node_modules/flatbuffers/js/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isLittleEndian = exports.float64 = exports.float32 = exports.int32 = void 0;
    exports.int32 = new Int32Array(2);
    exports.float32 = new Float32Array(exports.int32.buffer);
    exports.float64 = new Float64Array(exports.int32.buffer);
    exports.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
  }
});

// ../node_modules/flatbuffers/js/encoding.js
var require_encoding = __commonJS({
  "../node_modules/flatbuffers/js/encoding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Encoding = void 0;
    var Encoding;
    (function(Encoding2) {
      Encoding2[Encoding2["UTF8_BYTES"] = 1] = "UTF8_BYTES";
      Encoding2[Encoding2["UTF16_STRING"] = 2] = "UTF16_STRING";
    })(Encoding || (exports.Encoding = Encoding = {}));
  }
});

// ../node_modules/flatbuffers/js/byte-buffer.js
var require_byte_buffer = __commonJS({
  "../node_modules/flatbuffers/js/byte-buffer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ByteBuffer = void 0;
    var constants_js_1 = require_constants();
    var utils_js_1 = require_utils();
    var encoding_js_1 = require_encoding();
    var ByteBuffer = class {
      constructor(bytes_) {
        this.bytes_ = bytes_;
        this.position_ = 0;
        this.text_decoder_ = new TextDecoder();
      }
      static allocate(byte_size) {
        return new ByteBuffer(new Uint8Array(byte_size));
      }
      clear() {
        this.position_ = 0;
      }
      bytes() {
        return this.bytes_;
      }
      position() {
        return this.position_;
      }
      setPosition(position) {
        this.position_ = position;
      }
      capacity() {
        return this.bytes_.length;
      }
      readInt8(offset) {
        return this.readUint8(offset) << 24 >> 24;
      }
      readUint8(offset) {
        return this.bytes_[offset];
      }
      readInt16(offset) {
        return this.readUint16(offset) << 16 >> 16;
      }
      readUint16(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
      }
      readInt32(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
      }
      readUint32(offset) {
        return this.readInt32(offset) >>> 0;
      }
      readInt64(offset) {
        return BigInt.asIntN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
      }
      readUint64(offset) {
        return BigInt.asUintN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
      }
      readFloat32(offset) {
        utils_js_1.int32[0] = this.readInt32(offset);
        return utils_js_1.float32[0];
      }
      readFloat64(offset) {
        utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1] = this.readInt32(offset);
        utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
        return utils_js_1.float64[0];
      }
      writeInt8(offset, value) {
        this.bytes_[offset] = value;
      }
      writeUint8(offset, value) {
        this.bytes_[offset] = value;
      }
      writeInt16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
      }
      writeUint16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
      }
      writeInt32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
      }
      writeUint32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
      }
      writeInt64(offset, value) {
        this.writeInt32(offset, Number(BigInt.asIntN(32, value)));
        this.writeInt32(offset + 4, Number(BigInt.asIntN(32, value >> BigInt(32))));
      }
      writeUint64(offset, value) {
        this.writeUint32(offset, Number(BigInt.asUintN(32, value)));
        this.writeUint32(offset + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
      }
      writeFloat32(offset, value) {
        utils_js_1.float32[0] = value;
        this.writeInt32(offset, utils_js_1.int32[0]);
      }
      writeFloat64(offset, value) {
        utils_js_1.float64[0] = value;
        this.writeInt32(offset, utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1]);
        this.writeInt32(offset + 4, utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0]);
      }
      getBufferIdentifier() {
        if (this.bytes_.length < this.position_ + constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH) {
          throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
        }
        let result = "";
        for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
          result += String.fromCharCode(this.readInt8(this.position_ + constants_js_1.SIZEOF_INT + i));
        }
        return result;
      }
      __offset(bb_pos, vtable_offset) {
        const vtable = bb_pos - this.readInt32(bb_pos);
        return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
      }
      __union(t, offset) {
        t.bb_pos = offset + this.readInt32(offset);
        t.bb = this;
        return t;
      }
      __string(offset, opt_encoding) {
        offset += this.readInt32(offset);
        const length = this.readInt32(offset);
        offset += constants_js_1.SIZEOF_INT;
        const utf8bytes = this.bytes_.subarray(offset, offset + length);
        if (opt_encoding === encoding_js_1.Encoding.UTF8_BYTES)
          return utf8bytes;
        else
          return this.text_decoder_.decode(utf8bytes);
      }
      __union_with_string(o, offset) {
        if (typeof o === "string") {
          return this.__string(offset);
        }
        return this.__union(o, offset);
      }
      __indirect(offset) {
        return offset + this.readInt32(offset);
      }
      __vector(offset) {
        return offset + this.readInt32(offset) + constants_js_1.SIZEOF_INT;
      }
      __vector_len(offset) {
        return this.readInt32(offset + this.readInt32(offset));
      }
      __has_identifier(ident) {
        if (ident.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
          throw new Error("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
        }
        for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
          if (ident.charCodeAt(i) != this.readInt8(this.position() + constants_js_1.SIZEOF_INT + i)) {
            return false;
          }
        }
        return true;
      }
      createScalarList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
          const val = listAccessor(i);
          if (val !== null) {
            ret.push(val);
          }
        }
        return ret;
      }
      createObjList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
          const val = listAccessor(i);
          if (val !== null) {
            ret.push(val.unpack());
          }
        }
        return ret;
      }
    };
    exports.ByteBuffer = ByteBuffer;
  }
});

// ../node_modules/flatbuffers/js/builder.js
var require_builder = __commonJS({
  "../node_modules/flatbuffers/js/builder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Builder = void 0;
    var byte_buffer_js_1 = require_byte_buffer();
    var constants_js_1 = require_constants();
    var Builder = class {
      constructor(opt_initial_size) {
        this.minalign = 1;
        this.vtable = null;
        this.vtable_in_use = 0;
        this.isNested = false;
        this.object_start = 0;
        this.vtables = [];
        this.vector_num_elems = 0;
        this.force_defaults = false;
        this.string_maps = null;
        this.text_encoder = new TextEncoder();
        let initial_size;
        if (!opt_initial_size) {
          initial_size = 1024;
        } else {
          initial_size = opt_initial_size;
        }
        this.bb = byte_buffer_js_1.ByteBuffer.allocate(initial_size);
        this.space = initial_size;
      }
      clear() {
        this.bb.clear();
        this.space = this.bb.capacity();
        this.minalign = 1;
        this.vtable = null;
        this.vtable_in_use = 0;
        this.isNested = false;
        this.object_start = 0;
        this.vtables = [];
        this.vector_num_elems = 0;
        this.force_defaults = false;
        this.string_maps = null;
      }
      forceDefaults(forceDefaults) {
        this.force_defaults = forceDefaults;
      }
      dataBuffer() {
        return this.bb;
      }
      asUint8Array() {
        return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
      }
      prep(size, additional_bytes) {
        if (size > this.minalign) {
          this.minalign = size;
        }
        const align_size = ~(this.bb.capacity() - this.space + additional_bytes) + 1 & size - 1;
        while (this.space < align_size + size + additional_bytes) {
          const old_buf_size = this.bb.capacity();
          this.bb = Builder.growByteBuffer(this.bb);
          this.space += this.bb.capacity() - old_buf_size;
        }
        this.pad(align_size);
      }
      pad(byte_size) {
        for (let i = 0; i < byte_size; i++) {
          this.bb.writeInt8(--this.space, 0);
        }
      }
      writeInt8(value) {
        this.bb.writeInt8(this.space -= 1, value);
      }
      writeInt16(value) {
        this.bb.writeInt16(this.space -= 2, value);
      }
      writeInt32(value) {
        this.bb.writeInt32(this.space -= 4, value);
      }
      writeInt64(value) {
        this.bb.writeInt64(this.space -= 8, value);
      }
      writeFloat32(value) {
        this.bb.writeFloat32(this.space -= 4, value);
      }
      writeFloat64(value) {
        this.bb.writeFloat64(this.space -= 8, value);
      }
      addInt8(value) {
        this.prep(1, 0);
        this.writeInt8(value);
      }
      addInt16(value) {
        this.prep(2, 0);
        this.writeInt16(value);
      }
      addInt32(value) {
        this.prep(4, 0);
        this.writeInt32(value);
      }
      addInt64(value) {
        this.prep(8, 0);
        this.writeInt64(value);
      }
      addFloat32(value) {
        this.prep(4, 0);
        this.writeFloat32(value);
      }
      addFloat64(value) {
        this.prep(8, 0);
        this.writeFloat64(value);
      }
      addFieldInt8(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt8(value);
          this.slot(voffset);
        }
      }
      addFieldInt16(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt16(value);
          this.slot(voffset);
        }
      }
      addFieldInt32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt32(value);
          this.slot(voffset);
        }
      }
      addFieldInt64(voffset, value, defaultValue) {
        if (this.force_defaults || value !== defaultValue) {
          this.addInt64(value);
          this.slot(voffset);
        }
      }
      addFieldFloat32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addFloat32(value);
          this.slot(voffset);
        }
      }
      addFieldFloat64(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addFloat64(value);
          this.slot(voffset);
        }
      }
      addFieldOffset(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addOffset(value);
          this.slot(voffset);
        }
      }
      addFieldStruct(voffset, value, defaultValue) {
        if (value != defaultValue) {
          this.nested(value);
          this.slot(voffset);
        }
      }
      nested(obj) {
        if (obj != this.offset()) {
          throw new TypeError("FlatBuffers: struct must be serialized inline.");
        }
      }
      notNested() {
        if (this.isNested) {
          throw new TypeError("FlatBuffers: object serialization must not be nested.");
        }
      }
      slot(voffset) {
        if (this.vtable !== null)
          this.vtable[voffset] = this.offset();
      }
      offset() {
        return this.bb.capacity() - this.space;
      }
      static growByteBuffer(bb) {
        const old_buf_size = bb.capacity();
        if (old_buf_size & 3221225472) {
          throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
        }
        const new_buf_size = old_buf_size << 1;
        const nbb = byte_buffer_js_1.ByteBuffer.allocate(new_buf_size);
        nbb.setPosition(new_buf_size - old_buf_size);
        nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
        return nbb;
      }
      addOffset(offset) {
        this.prep(constants_js_1.SIZEOF_INT, 0);
        this.writeInt32(this.offset() - offset + constants_js_1.SIZEOF_INT);
      }
      startObject(numfields) {
        this.notNested();
        if (this.vtable == null) {
          this.vtable = [];
        }
        this.vtable_in_use = numfields;
        for (let i = 0; i < numfields; i++) {
          this.vtable[i] = 0;
        }
        this.isNested = true;
        this.object_start = this.offset();
      }
      endObject() {
        if (this.vtable == null || !this.isNested) {
          throw new Error("FlatBuffers: endObject called without startObject");
        }
        this.addInt32(0);
        const vtableloc = this.offset();
        let i = this.vtable_in_use - 1;
        for (; i >= 0 && this.vtable[i] == 0; i--) {
        }
        const trimmed_size = i + 1;
        for (; i >= 0; i--) {
          this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
        }
        const standard_fields = 2;
        this.addInt16(vtableloc - this.object_start);
        const len = (trimmed_size + standard_fields) * constants_js_1.SIZEOF_SHORT;
        this.addInt16(len);
        let existing_vtable = 0;
        const vt1 = this.space;
        outer_loop:
          for (i = 0; i < this.vtables.length; i++) {
            const vt2 = this.bb.capacity() - this.vtables[i];
            if (len == this.bb.readInt16(vt2)) {
              for (let j = constants_js_1.SIZEOF_SHORT; j < len; j += constants_js_1.SIZEOF_SHORT) {
                if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
                  continue outer_loop;
                }
              }
              existing_vtable = this.vtables[i];
              break;
            }
          }
        if (existing_vtable) {
          this.space = this.bb.capacity() - vtableloc;
          this.bb.writeInt32(this.space, existing_vtable - vtableloc);
        } else {
          this.vtables.push(this.offset());
          this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
        }
        this.isNested = false;
        return vtableloc;
      }
      finish(root_table, opt_file_identifier, opt_size_prefix) {
        const size_prefix = opt_size_prefix ? constants_js_1.SIZE_PREFIX_LENGTH : 0;
        if (opt_file_identifier) {
          const file_identifier = opt_file_identifier;
          this.prep(this.minalign, constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH + size_prefix);
          if (file_identifier.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
            throw new TypeError("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
          }
          for (let i = constants_js_1.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
            this.writeInt8(file_identifier.charCodeAt(i));
          }
        }
        this.prep(this.minalign, constants_js_1.SIZEOF_INT + size_prefix);
        this.addOffset(root_table);
        if (size_prefix) {
          this.addInt32(this.bb.capacity() - this.space);
        }
        this.bb.setPosition(this.space);
      }
      finishSizePrefixed(root_table, opt_file_identifier) {
        this.finish(root_table, opt_file_identifier, true);
      }
      requiredField(table, field) {
        const table_start = this.bb.capacity() - table;
        const vtable_start = table_start - this.bb.readInt32(table_start);
        const ok = field < this.bb.readInt16(vtable_start) && this.bb.readInt16(vtable_start + field) != 0;
        if (!ok) {
          throw new TypeError("FlatBuffers: field " + field + " must be set");
        }
      }
      startVector(elem_size, num_elems, alignment) {
        this.notNested();
        this.vector_num_elems = num_elems;
        this.prep(constants_js_1.SIZEOF_INT, elem_size * num_elems);
        this.prep(alignment, elem_size * num_elems);
      }
      endVector() {
        this.writeInt32(this.vector_num_elems);
        return this.offset();
      }
      createSharedString(s) {
        if (!s) {
          return 0;
        }
        if (!this.string_maps) {
          this.string_maps = /* @__PURE__ */ new Map();
        }
        if (this.string_maps.has(s)) {
          return this.string_maps.get(s);
        }
        const offset = this.createString(s);
        this.string_maps.set(s, offset);
        return offset;
      }
      createString(s) {
        if (s === null || s === void 0) {
          return 0;
        }
        let utf8;
        if (s instanceof Uint8Array) {
          utf8 = s;
        } else {
          utf8 = this.text_encoder.encode(s);
        }
        this.addInt8(0);
        this.startVector(1, utf8.length, 1);
        this.bb.setPosition(this.space -= utf8.length);
        this.bb.bytes().set(utf8, this.space);
        return this.endVector();
      }
      createByteVector(v) {
        if (v === null || v === void 0) {
          return 0;
        }
        this.startVector(1, v.length, 1);
        this.bb.setPosition(this.space -= v.length);
        this.bb.bytes().set(v, this.space);
        return this.endVector();
      }
      createObjectOffset(obj) {
        if (obj === null) {
          return 0;
        }
        if (typeof obj === "string") {
          return this.createString(obj);
        } else {
          return obj.pack(this);
        }
      }
      createObjectOffsetList(list) {
        const ret = [];
        for (let i = 0; i < list.length; ++i) {
          const val = list[i];
          if (val !== null) {
            ret.push(this.createObjectOffset(val));
          } else {
            throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
          }
        }
        return ret;
      }
      createStructOffsetList(list, startFunc) {
        startFunc(this, list.length);
        this.createObjectOffsetList(list.slice().reverse());
        return this.endVector();
      }
    };
    exports.Builder = Builder;
  }
});

// ../node_modules/flatbuffers/js/flatbuffers.js
var require_flatbuffers = __commonJS({
  "../node_modules/flatbuffers/js/flatbuffers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ByteBuffer = exports.Builder = exports.Encoding = exports.isLittleEndian = exports.float64 = exports.float32 = exports.int32 = exports.SIZE_PREFIX_LENGTH = exports.FILE_IDENTIFIER_LENGTH = exports.SIZEOF_INT = exports.SIZEOF_SHORT = void 0;
    var constants_js_1 = require_constants();
    Object.defineProperty(exports, "SIZEOF_SHORT", { enumerable: true, get: function() {
      return constants_js_1.SIZEOF_SHORT;
    } });
    var constants_js_2 = require_constants();
    Object.defineProperty(exports, "SIZEOF_INT", { enumerable: true, get: function() {
      return constants_js_2.SIZEOF_INT;
    } });
    var constants_js_3 = require_constants();
    Object.defineProperty(exports, "FILE_IDENTIFIER_LENGTH", { enumerable: true, get: function() {
      return constants_js_3.FILE_IDENTIFIER_LENGTH;
    } });
    var constants_js_4 = require_constants();
    Object.defineProperty(exports, "SIZE_PREFIX_LENGTH", { enumerable: true, get: function() {
      return constants_js_4.SIZE_PREFIX_LENGTH;
    } });
    var utils_js_1 = require_utils();
    Object.defineProperty(exports, "int32", { enumerable: true, get: function() {
      return utils_js_1.int32;
    } });
    Object.defineProperty(exports, "float32", { enumerable: true, get: function() {
      return utils_js_1.float32;
    } });
    Object.defineProperty(exports, "float64", { enumerable: true, get: function() {
      return utils_js_1.float64;
    } });
    Object.defineProperty(exports, "isLittleEndian", { enumerable: true, get: function() {
      return utils_js_1.isLittleEndian;
    } });
    var encoding_js_1 = require_encoding();
    Object.defineProperty(exports, "Encoding", { enumerable: true, get: function() {
      return encoding_js_1.Encoding;
    } });
    var builder_js_1 = require_builder();
    Object.defineProperty(exports, "Builder", { enumerable: true, get: function() {
      return builder_js_1.Builder;
    } });
    var byte_buffer_js_1 = require_byte_buffer();
    Object.defineProperty(exports, "ByteBuffer", { enumerable: true, get: function() {
      return byte_buffer_js_1.ByteBuffer;
    } });
  }
});

// ../node_modules/@openmeteo/sdk/model.js
var require_model = __commonJS({
  "../node_modules/@openmeteo/sdk/model.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    var Model;
    (function(Model2) {
      Model2[Model2["undefined"] = 0] = "undefined";
      Model2[Model2["best_match"] = 1] = "best_match";
      Model2[Model2["gfs_seamless"] = 2] = "gfs_seamless";
      Model2[Model2["gfs_global"] = 3] = "gfs_global";
      Model2[Model2["gfs_hrrr"] = 4] = "gfs_hrrr";
      Model2[Model2["meteofrance_seamless"] = 5] = "meteofrance_seamless";
      Model2[Model2["meteofrance_arpege_seamless"] = 6] = "meteofrance_arpege_seamless";
      Model2[Model2["meteofrance_arpege_world"] = 7] = "meteofrance_arpege_world";
      Model2[Model2["meteofrance_arpege_europe"] = 8] = "meteofrance_arpege_europe";
      Model2[Model2["meteofrance_arome_seamless"] = 9] = "meteofrance_arome_seamless";
      Model2[Model2["meteofrance_arome_france"] = 10] = "meteofrance_arome_france";
      Model2[Model2["meteofrance_arome_france_hd"] = 11] = "meteofrance_arome_france_hd";
      Model2[Model2["jma_seamless"] = 12] = "jma_seamless";
      Model2[Model2["jma_msm"] = 13] = "jma_msm";
      Model2[Model2["jms_gsm"] = 14] = "jms_gsm";
      Model2[Model2["jma_gsm"] = 15] = "jma_gsm";
      Model2[Model2["gem_seamless"] = 16] = "gem_seamless";
      Model2[Model2["gem_global"] = 17] = "gem_global";
      Model2[Model2["gem_regional"] = 18] = "gem_regional";
      Model2[Model2["gem_hrdps_continental"] = 19] = "gem_hrdps_continental";
      Model2[Model2["icon_seamless"] = 20] = "icon_seamless";
      Model2[Model2["icon_global"] = 21] = "icon_global";
      Model2[Model2["icon_eu"] = 22] = "icon_eu";
      Model2[Model2["icon_d2"] = 23] = "icon_d2";
      Model2[Model2["ecmwf_ifs04"] = 24] = "ecmwf_ifs04";
      Model2[Model2["metno_nordic"] = 25] = "metno_nordic";
      Model2[Model2["era5_seamless"] = 26] = "era5_seamless";
      Model2[Model2["era5"] = 27] = "era5";
      Model2[Model2["cerra"] = 28] = "cerra";
      Model2[Model2["era5_land"] = 29] = "era5_land";
      Model2[Model2["ecmwf_ifs"] = 30] = "ecmwf_ifs";
      Model2[Model2["gwam"] = 31] = "gwam";
      Model2[Model2["ewam"] = 32] = "ewam";
      Model2[Model2["glofas_seamless_v3"] = 33] = "glofas_seamless_v3";
      Model2[Model2["glofas_forecast_v3"] = 34] = "glofas_forecast_v3";
      Model2[Model2["glofas_consolidated_v3"] = 35] = "glofas_consolidated_v3";
      Model2[Model2["glofas_seamless_v4"] = 36] = "glofas_seamless_v4";
      Model2[Model2["glofas_forecast_v4"] = 37] = "glofas_forecast_v4";
      Model2[Model2["glofas_consolidated_v4"] = 38] = "glofas_consolidated_v4";
      Model2[Model2["gfs025"] = 39] = "gfs025";
      Model2[Model2["gfs05"] = 40] = "gfs05";
      Model2[Model2["CMCC_CM2_VHR4"] = 41] = "CMCC_CM2_VHR4";
      Model2[Model2["FGOALS_f3_H_highresSST"] = 42] = "FGOALS_f3_H_highresSST";
      Model2[Model2["FGOALS_f3_H"] = 43] = "FGOALS_f3_H";
      Model2[Model2["HiRAM_SIT_HR"] = 44] = "HiRAM_SIT_HR";
      Model2[Model2["MRI_AGCM3_2_S"] = 45] = "MRI_AGCM3_2_S";
      Model2[Model2["EC_Earth3P_HR"] = 46] = "EC_Earth3P_HR";
      Model2[Model2["MPI_ESM1_2_XR"] = 47] = "MPI_ESM1_2_XR";
      Model2[Model2["NICAM16_8S"] = 48] = "NICAM16_8S";
      Model2[Model2["cams_europe"] = 49] = "cams_europe";
      Model2[Model2["cams_global"] = 50] = "cams_global";
      Model2[Model2["cfsv2"] = 51] = "cfsv2";
      Model2[Model2["era5_ocean"] = 52] = "era5_ocean";
      Model2[Model2["cma_grapes_global"] = 53] = "cma_grapes_global";
      Model2[Model2["bom_access_global"] = 54] = "bom_access_global";
      Model2[Model2["bom_access_global_ensemble"] = 55] = "bom_access_global_ensemble";
      Model2[Model2["arpae_cosmo_seamless"] = 56] = "arpae_cosmo_seamless";
      Model2[Model2["arpae_cosmo_2i"] = 57] = "arpae_cosmo_2i";
      Model2[Model2["arpae_cosmo_2i_ruc"] = 58] = "arpae_cosmo_2i_ruc";
      Model2[Model2["arpae_cosmo_5m"] = 59] = "arpae_cosmo_5m";
      Model2[Model2["ecmwf_ifs025"] = 60] = "ecmwf_ifs025";
      Model2[Model2["ecmwf_aifs025"] = 61] = "ecmwf_aifs025";
      Model2[Model2["gfs013"] = 62] = "gfs013";
      Model2[Model2["gfs_graphcast025"] = 63] = "gfs_graphcast025";
      Model2[Model2["ecmwf_wam025"] = 64] = "ecmwf_wam025";
      Model2[Model2["meteofrance_wave"] = 65] = "meteofrance_wave";
      Model2[Model2["meteofrance_currents"] = 66] = "meteofrance_currents";
      Model2[Model2["ecmwf_wam025_ensemble"] = 67] = "ecmwf_wam025_ensemble";
      Model2[Model2["ncep_gfswave025"] = 68] = "ncep_gfswave025";
      Model2[Model2["ncep_gefswave025"] = 69] = "ncep_gefswave025";
      Model2[Model2["knmi_seamless"] = 70] = "knmi_seamless";
      Model2[Model2["knmi_harmonie_arome_europe"] = 71] = "knmi_harmonie_arome_europe";
      Model2[Model2["knmi_harmonie_arome_netherlands"] = 72] = "knmi_harmonie_arome_netherlands";
      Model2[Model2["dmi_seamless"] = 73] = "dmi_seamless";
      Model2[Model2["dmi_harmonie_arome_europe"] = 74] = "dmi_harmonie_arome_europe";
      Model2[Model2["metno_seamless"] = 75] = "metno_seamless";
      Model2[Model2["era5_ensemble"] = 76] = "era5_ensemble";
      Model2[Model2["ecmwf_ifs_analysis"] = 77] = "ecmwf_ifs_analysis";
      Model2[Model2["ecmwf_ifs_long_window"] = 78] = "ecmwf_ifs_long_window";
      Model2[Model2["ecmwf_ifs_analysis_long_window"] = 79] = "ecmwf_ifs_analysis_long_window";
      Model2[Model2["ukmo_global_deterministic_10km"] = 80] = "ukmo_global_deterministic_10km";
      Model2[Model2["ukmo_uk_deterministic_2km"] = 81] = "ukmo_uk_deterministic_2km";
      Model2[Model2["ukmo_seamless"] = 82] = "ukmo_seamless";
    })(Model || (exports.Model = Model = {}));
  }
});

// ../node_modules/@openmeteo/sdk/aggregation.js
var require_aggregation = __commonJS({
  "../node_modules/@openmeteo/sdk/aggregation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Aggregation = void 0;
    var Aggregation;
    (function(Aggregation2) {
      Aggregation2[Aggregation2["none"] = 0] = "none";
      Aggregation2[Aggregation2["minimum"] = 1] = "minimum";
      Aggregation2[Aggregation2["maximum"] = 2] = "maximum";
      Aggregation2[Aggregation2["mean"] = 3] = "mean";
      Aggregation2[Aggregation2["p10"] = 4] = "p10";
      Aggregation2[Aggregation2["p25"] = 5] = "p25";
      Aggregation2[Aggregation2["median"] = 6] = "median";
      Aggregation2[Aggregation2["p75"] = 7] = "p75";
      Aggregation2[Aggregation2["p90"] = 8] = "p90";
      Aggregation2[Aggregation2["dominant"] = 9] = "dominant";
      Aggregation2[Aggregation2["sum"] = 10] = "sum";
      Aggregation2[Aggregation2["spread"] = 11] = "spread";
    })(Aggregation || (exports.Aggregation = Aggregation = {}));
  }
});

// ../node_modules/@openmeteo/sdk/unit.js
var require_unit = __commonJS({
  "../node_modules/@openmeteo/sdk/unit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Unit = void 0;
    var Unit;
    (function(Unit2) {
      Unit2[Unit2["undefined"] = 0] = "undefined";
      Unit2[Unit2["celsius"] = 1] = "celsius";
      Unit2[Unit2["centimetre"] = 2] = "centimetre";
      Unit2[Unit2["cubic_metre_per_cubic_metre"] = 3] = "cubic_metre_per_cubic_metre";
      Unit2[Unit2["cubic_metre_per_second"] = 4] = "cubic_metre_per_second";
      Unit2[Unit2["degree_direction"] = 5] = "degree_direction";
      Unit2[Unit2["dimensionless_integer"] = 6] = "dimensionless_integer";
      Unit2[Unit2["dimensionless"] = 7] = "dimensionless";
      Unit2[Unit2["european_air_quality_index"] = 8] = "european_air_quality_index";
      Unit2[Unit2["fahrenheit"] = 9] = "fahrenheit";
      Unit2[Unit2["feet"] = 10] = "feet";
      Unit2[Unit2["fraction"] = 11] = "fraction";
      Unit2[Unit2["gdd_celsius"] = 12] = "gdd_celsius";
      Unit2[Unit2["geopotential_metre"] = 13] = "geopotential_metre";
      Unit2[Unit2["grains_per_cubic_metre"] = 14] = "grains_per_cubic_metre";
      Unit2[Unit2["gram_per_kilogram"] = 15] = "gram_per_kilogram";
      Unit2[Unit2["hectopascal"] = 16] = "hectopascal";
      Unit2[Unit2["hours"] = 17] = "hours";
      Unit2[Unit2["inch"] = 18] = "inch";
      Unit2[Unit2["iso8601"] = 19] = "iso8601";
      Unit2[Unit2["joule_per_kilogram"] = 20] = "joule_per_kilogram";
      Unit2[Unit2["kelvin"] = 21] = "kelvin";
      Unit2[Unit2["kilopascal"] = 22] = "kilopascal";
      Unit2[Unit2["kilogram_per_square_metre"] = 23] = "kilogram_per_square_metre";
      Unit2[Unit2["kilometres_per_hour"] = 24] = "kilometres_per_hour";
      Unit2[Unit2["knots"] = 25] = "knots";
      Unit2[Unit2["megajoule_per_square_metre"] = 26] = "megajoule_per_square_metre";
      Unit2[Unit2["metre_per_second_not_unit_converted"] = 27] = "metre_per_second_not_unit_converted";
      Unit2[Unit2["metre_per_second"] = 28] = "metre_per_second";
      Unit2[Unit2["metre"] = 29] = "metre";
      Unit2[Unit2["micrograms_per_cubic_metre"] = 30] = "micrograms_per_cubic_metre";
      Unit2[Unit2["miles_per_hour"] = 31] = "miles_per_hour";
      Unit2[Unit2["millimetre"] = 32] = "millimetre";
      Unit2[Unit2["pascal"] = 33] = "pascal";
      Unit2[Unit2["per_second"] = 34] = "per_second";
      Unit2[Unit2["percentage"] = 35] = "percentage";
      Unit2[Unit2["seconds"] = 36] = "seconds";
      Unit2[Unit2["unix_time"] = 37] = "unix_time";
      Unit2[Unit2["us_air_quality_index"] = 38] = "us_air_quality_index";
      Unit2[Unit2["watt_per_square_metre"] = 39] = "watt_per_square_metre";
      Unit2[Unit2["wmo_code"] = 40] = "wmo_code";
    })(Unit || (exports.Unit = Unit = {}));
  }
});

// ../node_modules/@openmeteo/sdk/variable.js
var require_variable = __commonJS({
  "../node_modules/@openmeteo/sdk/variable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Variable = void 0;
    var Variable;
    (function(Variable2) {
      Variable2[Variable2["undefined"] = 0] = "undefined";
      Variable2[Variable2["apparent_temperature"] = 1] = "apparent_temperature";
      Variable2[Variable2["cape"] = 2] = "cape";
      Variable2[Variable2["cloud_cover"] = 3] = "cloud_cover";
      Variable2[Variable2["cloud_cover_high"] = 4] = "cloud_cover_high";
      Variable2[Variable2["cloud_cover_low"] = 5] = "cloud_cover_low";
      Variable2[Variable2["cloud_cover_mid"] = 6] = "cloud_cover_mid";
      Variable2[Variable2["daylight_duration"] = 7] = "daylight_duration";
      Variable2[Variable2["dew_point"] = 8] = "dew_point";
      Variable2[Variable2["diffuse_radiation"] = 9] = "diffuse_radiation";
      Variable2[Variable2["diffuse_radiation_instant"] = 10] = "diffuse_radiation_instant";
      Variable2[Variable2["direct_normal_irradiance"] = 11] = "direct_normal_irradiance";
      Variable2[Variable2["direct_normal_irradiance_instant"] = 12] = "direct_normal_irradiance_instant";
      Variable2[Variable2["direct_radiation"] = 13] = "direct_radiation";
      Variable2[Variable2["direct_radiation_instant"] = 14] = "direct_radiation_instant";
      Variable2[Variable2["et0_fao_evapotranspiration"] = 15] = "et0_fao_evapotranspiration";
      Variable2[Variable2["evapotranspiration"] = 16] = "evapotranspiration";
      Variable2[Variable2["freezing_level_height"] = 17] = "freezing_level_height";
      Variable2[Variable2["growing_degree_days"] = 18] = "growing_degree_days";
      Variable2[Variable2["is_day"] = 19] = "is_day";
      Variable2[Variable2["latent_heat_flux"] = 20] = "latent_heat_flux";
      Variable2[Variable2["leaf_wetness_probability"] = 21] = "leaf_wetness_probability";
      Variable2[Variable2["lifted_index"] = 22] = "lifted_index";
      Variable2[Variable2["lightning_potential"] = 23] = "lightning_potential";
      Variable2[Variable2["precipitation"] = 24] = "precipitation";
      Variable2[Variable2["precipitation_hours"] = 25] = "precipitation_hours";
      Variable2[Variable2["precipitation_probability"] = 26] = "precipitation_probability";
      Variable2[Variable2["pressure_msl"] = 27] = "pressure_msl";
      Variable2[Variable2["rain"] = 28] = "rain";
      Variable2[Variable2["relative_humidity"] = 29] = "relative_humidity";
      Variable2[Variable2["runoff"] = 30] = "runoff";
      Variable2[Variable2["sensible_heat_flux"] = 31] = "sensible_heat_flux";
      Variable2[Variable2["shortwave_radiation"] = 32] = "shortwave_radiation";
      Variable2[Variable2["shortwave_radiation_instant"] = 33] = "shortwave_radiation_instant";
      Variable2[Variable2["showers"] = 34] = "showers";
      Variable2[Variable2["snow_depth"] = 35] = "snow_depth";
      Variable2[Variable2["snow_height"] = 36] = "snow_height";
      Variable2[Variable2["snowfall"] = 37] = "snowfall";
      Variable2[Variable2["snowfall_height"] = 38] = "snowfall_height";
      Variable2[Variable2["snowfall_water_equivalent"] = 39] = "snowfall_water_equivalent";
      Variable2[Variable2["sunrise"] = 40] = "sunrise";
      Variable2[Variable2["sunset"] = 41] = "sunset";
      Variable2[Variable2["soil_moisture"] = 42] = "soil_moisture";
      Variable2[Variable2["soil_moisture_index"] = 43] = "soil_moisture_index";
      Variable2[Variable2["soil_temperature"] = 44] = "soil_temperature";
      Variable2[Variable2["surface_pressure"] = 45] = "surface_pressure";
      Variable2[Variable2["surface_temperature"] = 46] = "surface_temperature";
      Variable2[Variable2["temperature"] = 47] = "temperature";
      Variable2[Variable2["terrestrial_radiation"] = 48] = "terrestrial_radiation";
      Variable2[Variable2["terrestrial_radiation_instant"] = 49] = "terrestrial_radiation_instant";
      Variable2[Variable2["total_column_integrated_water_vapour"] = 50] = "total_column_integrated_water_vapour";
      Variable2[Variable2["updraft"] = 51] = "updraft";
      Variable2[Variable2["uv_index"] = 52] = "uv_index";
      Variable2[Variable2["uv_index_clear_sky"] = 53] = "uv_index_clear_sky";
      Variable2[Variable2["vapour_pressure_deficit"] = 54] = "vapour_pressure_deficit";
      Variable2[Variable2["visibility"] = 55] = "visibility";
      Variable2[Variable2["weather_code"] = 56] = "weather_code";
      Variable2[Variable2["wind_direction"] = 57] = "wind_direction";
      Variable2[Variable2["wind_gusts"] = 58] = "wind_gusts";
      Variable2[Variable2["wind_speed"] = 59] = "wind_speed";
      Variable2[Variable2["vertical_velocity"] = 60] = "vertical_velocity";
      Variable2[Variable2["geopotential_height"] = 61] = "geopotential_height";
      Variable2[Variable2["wet_bulb_temperature"] = 62] = "wet_bulb_temperature";
      Variable2[Variable2["river_discharge"] = 63] = "river_discharge";
      Variable2[Variable2["wave_height"] = 64] = "wave_height";
      Variable2[Variable2["wave_period"] = 65] = "wave_period";
      Variable2[Variable2["wave_direction"] = 66] = "wave_direction";
      Variable2[Variable2["wind_wave_height"] = 67] = "wind_wave_height";
      Variable2[Variable2["wind_wave_period"] = 68] = "wind_wave_period";
      Variable2[Variable2["wind_wave_peak_period"] = 69] = "wind_wave_peak_period";
      Variable2[Variable2["wind_wave_direction"] = 70] = "wind_wave_direction";
      Variable2[Variable2["swell_wave_height"] = 71] = "swell_wave_height";
      Variable2[Variable2["swell_wave_period"] = 72] = "swell_wave_period";
      Variable2[Variable2["swell_wave_peak_period"] = 73] = "swell_wave_peak_period";
      Variable2[Variable2["swell_wave_direction"] = 74] = "swell_wave_direction";
      Variable2[Variable2["pm10"] = 75] = "pm10";
      Variable2[Variable2["pm2p5"] = 76] = "pm2p5";
      Variable2[Variable2["dust"] = 77] = "dust";
      Variable2[Variable2["aerosol_optical_depth"] = 78] = "aerosol_optical_depth";
      Variable2[Variable2["carbon_monoxide"] = 79] = "carbon_monoxide";
      Variable2[Variable2["nitrogen_dioxide"] = 80] = "nitrogen_dioxide";
      Variable2[Variable2["ammonia"] = 81] = "ammonia";
      Variable2[Variable2["ozone"] = 82] = "ozone";
      Variable2[Variable2["sulphur_dioxide"] = 83] = "sulphur_dioxide";
      Variable2[Variable2["alder_pollen"] = 84] = "alder_pollen";
      Variable2[Variable2["birch_pollen"] = 85] = "birch_pollen";
      Variable2[Variable2["grass_pollen"] = 86] = "grass_pollen";
      Variable2[Variable2["mugwort_pollen"] = 87] = "mugwort_pollen";
      Variable2[Variable2["olive_pollen"] = 88] = "olive_pollen";
      Variable2[Variable2["ragweed_pollen"] = 89] = "ragweed_pollen";
      Variable2[Variable2["european_aqi"] = 90] = "european_aqi";
      Variable2[Variable2["european_aqi_pm2p5"] = 91] = "european_aqi_pm2p5";
      Variable2[Variable2["european_aqi_pm10"] = 92] = "european_aqi_pm10";
      Variable2[Variable2["european_aqi_nitrogen_dioxide"] = 93] = "european_aqi_nitrogen_dioxide";
      Variable2[Variable2["european_aqi_ozone"] = 94] = "european_aqi_ozone";
      Variable2[Variable2["european_aqi_sulphur_dioxide"] = 95] = "european_aqi_sulphur_dioxide";
      Variable2[Variable2["us_aqi"] = 96] = "us_aqi";
      Variable2[Variable2["us_aqi_pm2p5"] = 97] = "us_aqi_pm2p5";
      Variable2[Variable2["us_aqi_pm10"] = 98] = "us_aqi_pm10";
      Variable2[Variable2["us_aqi_nitrogen_dioxide"] = 99] = "us_aqi_nitrogen_dioxide";
      Variable2[Variable2["us_aqi_ozone"] = 100] = "us_aqi_ozone";
      Variable2[Variable2["us_aqi_sulphur_dioxide"] = 101] = "us_aqi_sulphur_dioxide";
      Variable2[Variable2["us_aqi_carbon_monoxide"] = 102] = "us_aqi_carbon_monoxide";
      Variable2[Variable2["sunshine_duration"] = 103] = "sunshine_duration";
      Variable2[Variable2["convective_inhibition"] = 104] = "convective_inhibition";
      Variable2[Variable2["shortwave_radiation_clear_sky"] = 105] = "shortwave_radiation_clear_sky";
      Variable2[Variable2["global_tilted_irradiance"] = 106] = "global_tilted_irradiance";
      Variable2[Variable2["global_tilted_irradiance_instant"] = 107] = "global_tilted_irradiance_instant";
      Variable2[Variable2["ocean_current_velocity"] = 108] = "ocean_current_velocity";
      Variable2[Variable2["ocean_current_direction"] = 109] = "ocean_current_direction";
      Variable2[Variable2["cloud_base"] = 110] = "cloud_base";
      Variable2[Variable2["cloud_top"] = 111] = "cloud_top";
    })(Variable || (exports.Variable = Variable = {}));
  }
});

// ../node_modules/@openmeteo/sdk/variable-with-values.js
var require_variable_with_values = __commonJS({
  "../node_modules/@openmeteo/sdk/variable-with-values.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VariableWithValues = void 0;
    var flatbuffers = __importStar(require_flatbuffers());
    var aggregation_js_1 = require_aggregation();
    var unit_js_1 = require_unit();
    var variable_js_1 = require_variable();
    var VariableWithValues = class {
      constructor() {
        this.bb = null;
        this.bb_pos = 0;
      }
      __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
      }
      static getRootAsVariableWithValues(bb, obj) {
        return (obj || new VariableWithValues()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      static getSizePrefixedRootAsVariableWithValues(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new VariableWithValues()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      variable() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : variable_js_1.Variable.undefined;
      }
      unit() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : unit_js_1.Unit.undefined;
      }
      value() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
      }
      values(index) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
      }
      valuesLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
      }
      valuesArray() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? new Float32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
      }
      valuesInt64(index) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readInt64(this.bb.__vector(this.bb_pos + offset) + index * 8) : BigInt(0);
      }
      valuesInt64Length() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
      }
      altitude() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
      aggregation() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : aggregation_js_1.Aggregation.none;
      }
      pressureLevel() {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
      depth() {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
      depthTo() {
        const offset = this.bb.__offset(this.bb_pos, 22);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
      ensembleMember() {
        const offset = this.bb.__offset(this.bb_pos, 24);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
      previousDay() {
        const offset = this.bb.__offset(this.bb_pos, 26);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
      }
    };
    exports.VariableWithValues = VariableWithValues;
  }
});

// ../node_modules/@openmeteo/sdk/variables-with-time.js
var require_variables_with_time = __commonJS({
  "../node_modules/@openmeteo/sdk/variables-with-time.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VariablesWithTime = void 0;
    var flatbuffers = __importStar(require_flatbuffers());
    var variable_with_values_js_1 = require_variable_with_values();
    var VariablesWithTime = class {
      constructor() {
        this.bb = null;
        this.bb_pos = 0;
      }
      __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
      }
      static getRootAsVariablesWithTime(bb, obj) {
        return (obj || new VariablesWithTime()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      static getSizePrefixedRootAsVariablesWithTime(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new VariablesWithTime()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      time() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
      }
      timeEnd() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
      }
      interval() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
      }
      variables(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new variable_with_values_js_1.VariableWithValues()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
      }
      variablesLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
      }
    };
    exports.VariablesWithTime = VariablesWithTime;
  }
});

// ../node_modules/@openmeteo/sdk/weather-api-response.js
var require_weather_api_response = __commonJS({
  "../node_modules/@openmeteo/sdk/weather-api-response.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WeatherApiResponse = void 0;
    var flatbuffers = __importStar(require_flatbuffers());
    var model_js_1 = require_model();
    var variables_with_time_js_1 = require_variables_with_time();
    var WeatherApiResponse = class {
      constructor() {
        this.bb = null;
        this.bb_pos = 0;
      }
      __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
      }
      static getRootAsWeatherApiResponse(bb, obj) {
        return (obj || new WeatherApiResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      static getSizePrefixedRootAsWeatherApiResponse(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new WeatherApiResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
      }
      latitude() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
      }
      longitude() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
      }
      elevation() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
      }
      generationTimeMilliseconds() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
      }
      locationId() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
      }
      model() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : model_js_1.Model.undefined;
      }
      utcOffsetSeconds() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
      }
      timezone(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
      }
      timezoneAbbreviation(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
      }
      current(obj) {
        const offset = this.bb.__offset(this.bb_pos, 22);
        return offset ? (obj || new variables_with_time_js_1.VariablesWithTime()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
      }
      daily(obj) {
        const offset = this.bb.__offset(this.bb_pos, 24);
        return offset ? (obj || new variables_with_time_js_1.VariablesWithTime()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
      }
      hourly(obj) {
        const offset = this.bb.__offset(this.bb_pos, 26);
        return offset ? (obj || new variables_with_time_js_1.VariablesWithTime()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
      }
      minutely15(obj) {
        const offset = this.bb.__offset(this.bb_pos, 28);
        return offset ? (obj || new variables_with_time_js_1.VariablesWithTime()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
      }
      sixHourly(obj) {
        const offset = this.bb.__offset(this.bb_pos, 30);
        return offset ? (obj || new variables_with_time_js_1.VariablesWithTime()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
      }
    };
    exports.WeatherApiResponse = WeatherApiResponse;
  }
});

// ../node_modules/openmeteo/lib/index.js
var require_lib = __commonJS({
  "../node_modules/openmeteo/lib/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchWeatherApi = void 0;
    var flatbuffers_1 = require_flatbuffers();
    var weather_api_response_1 = require_weather_api_response();
    var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    function fetchRetried(url_1) {
      return __awaiter(this, arguments, void 0, function* (url2, retries = 3, backoffFactor = 0.5, backoffMax = 2) {
        const statusToRetry = [500, 502, 504];
        const statusWithJsonError = [400, 429];
        let currentTry = 0;
        let response2 = yield fetch(url2);
        while (statusToRetry.includes(response2.status)) {
          currentTry++;
          if (currentTry >= retries) {
            throw new Error(response2.statusText);
          }
          const sleepMs = Math.min(backoffFactor * Math.pow(2, currentTry), backoffMax) * 1e3;
          yield sleep(sleepMs);
          response2 = yield fetch(url2);
        }
        if (statusWithJsonError.includes(response2.status)) {
          const json = yield response2.json();
          if ("reason" in json) {
            throw new Error(json.reason);
          }
          throw new Error(response2.statusText);
        }
        return response2;
      });
    }
    function fetchWeatherApi2(url_1, params_1) {
      return __awaiter(this, arguments, void 0, function* (url2, params2, retries = 3, backoffFactor = 0.2, backoffMax = 2) {
        const urlParams = new URLSearchParams(params2);
        urlParams.set("format", "flatbuffers");
        const response2 = yield fetchRetried(`${url2}?${urlParams.toString()}`, retries, backoffFactor, backoffMax);
        const fb = new flatbuffers_1.ByteBuffer(new Uint8Array(yield response2.arrayBuffer()));
        const results = [];
        let pos = 0;
        while (pos < fb.capacity()) {
          fb.setPosition(pos);
          const len = fb.readInt32(fb.position());
          results.push(weather_api_response_1.WeatherApiResponse.getSizePrefixedRootAsWeatherApiResponse(fb));
          pos += len + 4;
        }
        return results;
      });
    }
    exports.fetchWeatherApi = fetchWeatherApi2;
  }
});


// data.ts
var import_openmeteo = __toESM(require_lib());
var params = {
  "latitude": 45.3516,
  "longitude": 19.0023,
  "current": ["temperature_2m", "relative_humidity_2m", "is_day", "rain"],
  "hourly": "temperature_80m",
  "daily": ["temperature_2m_max", "temperature_2m_min"],
  "timeformat": "unixtime",
  "timezone": "auto"
};
var url = "https://api.open-meteo.com/v1/forecast";
var responses = await (0, import_openmeteo.fetchWeatherApi)(url, params);
var range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
var response = responses[0];
var utcOffsetSeconds = response.utcOffsetSeconds();
var timezone = response.timezone();
var timezoneAbbreviation = response.timezoneAbbreviation();
var latitude = response.latitude();
var longitude = response.longitude();
var current = response.current();
var hourly = response.hourly();
var daily = response.daily();
var weatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1e3),
    temperature2m: current.variables(0).value(),
    relativeHumidity2m: current.variables(1).value(),
    isDay: current.variables(2).value(),
    rain: current.variables(3).value()
  },
  hourly: {
    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => {
      const date = new Date((t + utcOffsetSeconds) * 1e3);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      return `${hours}:00`;
    }).slice(0, 24),
    temperature80m: (() => {
      const variable = hourly.variables(0);
      if (variable) {
        const values = variable.valuesArray();
        if (values) {
          return Array.from(values).slice(0, 24);
        }
      }
      return [];
    })()
  },
  daily: {
    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map((t) => {
      const date = new Date((t + utcOffsetSeconds) * 1e3);
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return daysOfWeek[date.getUTCDay()];
    }).slice(0, 7),
    temperature2mMax: (() => {
      const variable = daily.variables(0);
      if (variable) {
        const values = variable.valuesArray();
        if (values) {
          return Array.from(values).slice(0, 7);
        }
      }
      return [];
    })(),
    temperature2mMin: (() => {
      const variable = daily.variables(1);
      if (variable) {
        const values = variable.valuesArray();
        if (values) {
          return Array.from(values).slice(0, 7);
        }
      }
      return [];
    })()
  }
};
export {weatherData};