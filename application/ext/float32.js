// ==========================================================================
// Project:   Blossom - Modern, Cross-Platform Application Framework
// Copyright: ©2012 Fohr Motion Picture Studios. All rights reserved.
// License:   Licensed under the GPLv3 license (see BLOSSOM-LICENSE).
// ==========================================================================
/*globals BLOSSOM ArrayBuffer Float32Array sc_assert */

if (BLOSSOM) {

SC.MakeFloat32ArrayBuffer = function(floatCount) {
  return new ArrayBuffer(floatCount*Float32Array.BYTES_PER_ELEMENT);
};

SC.MakePoint = function(point, y) {
  var ret, x = point;

  if (arguments.length === 2) {
    ret = new Float32Array(2);     // initialize from function arguments
    ret[0] = x;
    ret[1] = y;

  } else if (point) {
    sc_assert(point.length === 2 && point.constructor === Float32Array);
    ret = new Float32Array(point); // initialize with existing point

  } else {
    ret = new Float32Array(2);     // zero-initialized
  }

  return ret;
};

SC.ZERO_POINT = SC.MakePoint();

SC.PointApplyAffineTransformTo = function(point, transform, dest) {
  sc_assert(point !== dest);
  dest[0]/*x*/ = point[0]/*x*/ * transform[0]/*m11*/ + point[1]/*y*/ * transform[2]/*m21*/ + transform[4]/*tx*/;
  dest[1]/*y*/ = point[0]/*x*/ * transform[1]/*m12*/ + point[1]/*y*/ * transform[3]/*m22*/ + transform[5]/*ty*/;
};

// offset is in floats, numElements is in floats
var sc_assert_valid_float32_buffer = function(buffer, offset, numElements) {
  var bytesNeeded = numElements*Float32Array.BYTES_PER_ELEMENT,
      offsetInBytes = offset*Float32Array.BYTES_PER_ELEMENT;

  sc_assert(buffer && buffer.constructor === ArrayBuffer);
  sc_assert(buffer.byteLength-offsetInBytes >= bytesNeeded);
};

// offset is in floats, not bytes
SC.MakePointFromBuffer = function(buffer, offset, point, y) {
  var ret, x = point;

  sc_assert_valid_float32_buffer(buffer, offset, 2);
  offset = offset*Float32Array.BYTES_PER_ELEMENT;

  if (arguments.length === 4) {
    ret = new Float32Array(buffer, offset); // initialize from function arguments
    ret[0] = x;
    ret[1] = y;

  } else if (point) {
    sc_assert(point.length === 2 && point.constructor === Float32Array);
    ret = new Float32Array(buffer, offset);
    ret.set(point);                         // initialize with existing point

  } else {
    ret = new Float32Array(buffer, offset);
    ret.set(SC.ZERO_POINT);                 // zero-initialize
  }

  return ret;
};

SC.MakeSize = function(size, height) {
  var ret, width = size;

  if (arguments.length === 2) {
    ret = new Float32Array(2);     // initialize from function arguments
    ret[0] = width;
    ret[1] = height;

  } else if (size) {
    sc_assert(size.length === 2 && size.constructor === Float32Array);
    ret = new Float32Array(size); // initialize with existing size

  } else {
    ret = new Float32Array(2);    // zero-initialized
  }

  return ret;
};

SC.ZERO_SIZE = SC.MakeSize();

SC.SizeApplyAffineTransformTo = function(size, transform, dest) {
  sc_assert(size !== dest);
  dest[0]/*width*/  = size[0]/*width*/ * transform[0]/*m11*/ + size[1]/*height*/ * transform[2]/*m21*/;
  dest[1]/*height*/ = size[0]/*width*/ * transform[1]/*m12*/ + size[1]/*height*/ * transform[3]/*m22*/;
};

// offset is in floats, not bytes
SC.MakeSizeFromBuffer = function(buffer, offset, size, height) {
  var ret, width = size;

  sc_assert_valid_float32_buffer(buffer, offset, 2);
  offset = offset*Float32Array.BYTES_PER_ELEMENT;

  if (arguments.length === 4) {
    ret = new Float32Array(buffer, offset); // initialize from function arguments
    ret[0] = width;
    ret[1] = height;

  } else if (size) {
    sc_assert(size.length === 2 && size.constructor === Float32Array);
    ret = new Float32Array(buffer, offset);
    ret.set(size);                         // initialize with existing size

  } else {
    ret = new Float32Array(buffer, offset);
    ret.set(SC.ZERO_SIZE);                 // zero-initialize
  }

  return ret;
};

SC.MakeRect = function(rect, y, width, height) {
  var ret, x = rect;

  if (arguments.length === 4) {
    ret = new Float32Array(4);     // initialize from function arguments
    ret[0] = x;
    ret[1] = y;
    ret[2] = width;
    ret[3] = height;

  } else if (rect) {
    sc_assert(rect.length === 4 && rect.constructor === Float32Array);
    ret = new Float32Array(rect); // initialize with existing rect

  } else {
    ret = new Float32Array(4);    // zero-initialized
  }

  return ret;
};

SC.ZERO_RECT = SC.MakeRect();

SC.RectApplyAffineTransformTo = function(rect, transform, dest) {
  sc_assert(rect !== dest);
  dest[0]/*x*/      = rect[0]/*x*/ * transform[0]/*m11*/ + rect[1]/*y*/ * transform[2]/*m21*/ + transform[4]/*tx*/;
  dest[1]/*y*/      = rect[0]/*x*/ * transform[1]/*m12*/ + rect[1]/*y*/ * transform[3]/*m22*/ + transform[5]/*ty*/;
  dest[2]/*width*/  = rect[2]/*width*/ * transform[0]/*m11*/ + rect[3]/*height*/ * transform[2]/*m21*/;
  dest[3]/*height*/ = rect[2]/*width*/ * transform[1]/*m12*/ + rect[3]/*height*/ * transform[3]/*m22*/;
};

// offset is in floats, not bytes
SC.MakeRectFromBuffer = function(buffer, offset, rect, y, width, height) {
  var ret, x = rect;

  sc_assert_valid_float32_buffer(buffer, offset, 4);
  offset = offset*Float32Array.BYTES_PER_ELEMENT;

  if (arguments.length === 6) {
    ret = new Float32Array(buffer, offset); // initialize from function arguments
    ret[0] = x;
    ret[1] = y;
    ret[2] = width;
    ret[3] = height;

  } else if (rect) {
    sc_assert(rect.length === 4 && rect.constructor === Float32Array);
    ret = new Float32Array(buffer, offset);
    ret.set(rect);                         // initialize with existing rect

  } else {
    ret = new Float32Array(buffer, offset);
    ret.set(SC.ZERO_RECT);                 // zero-initialize
  }

  return ret;
};

SC.MakeAffineTransform = function(mat, m12,
                                  m21, m22,  tx, ty)
{
  var ret, m11 = mat;

  if (arguments.length === 6) {
    ret = new Float32Array(6);    // initialize from function arguments
    ret[0]  = m11; ret[1]  = m12;
    ret[2]  = m21; ret[3]  = m22;

    ret[4] = tx;
    ret[5] = ty;

  } else if (mat) {
    sc_assert(mat.length === 6 && mat.constructor === Float32Array);
    ret = new Float32Array(mat); // initialize with existing affine transform

  } else {
    ret = new Float32Array(6);   // zero-initialized
  }

  return ret;
};

SC.MakeIdentityAffineTransform = function() {
  var ret = new Float32Array(6);

  // A new Float32Array is already initialized to zero.
     ret[0]  = 1; /* ret[1]  = 0; */
  /* ret[2]  = 0; */ ret[3]  = 1;
  
  // ret[4] = 0;
  // ret[5] = 0;

  return ret;
};

SC.AFFINE_TRANSFORM_ZERO = SC.MakeAffineTransform();
SC.AFFINE_TRANSFORM_IDENTITY = SC.MakeIdentityAffineTransform();

// offset is in floats, not bytes
SC.MakeAffineTransformFromBuffer = function(buffer, offset, mat, m12,
                                                            m21, m22,  tx, ty)
{
  var ret, m11 = mat;

  sc_assert_valid_float32_buffer(buffer, offset, 6);
  offset = offset*Float32Array.BYTES_PER_ELEMENT;

  if (arguments.length === 8) {
    ret = new Float32Array(buffer, offset); // initialize from function arguments
    ret[0]  = m11; ret[1]  = m12;
    ret[2]  = m21; ret[3]  = m22;

    ret[4] = tx;
    ret[5] = ty;

  } else if (mat) {
    sc_assert(mat.length === 6 && mat.constructor === Float32Array);
    ret = new Float32Array(buffer, offset);
    ret.set(mat);                           // initialize with existing transform

  } else {
    ret = new Float32Array(buffer, offset);
    ret.set(SC.AFFINE_TRANSFORM_ZERO);      // zero-initialize
  }

  return ret;
};

SC.MakeIdentityAffineTransformFromBuffer = function(buffer, offset) {
  var ret = SC.MakeAffineTransformFromBuffer(buffer, offset);
  ret.set(SC.AFFINE_TRANSFORM_IDENTITY);
  return ret;
};

SC.SetIdentityAffineTransform = function(mat) {
  sc_assert(mat && mat.length === 6 && mat.constructor === Float32Array);
  mat.set(SC.AFFINE_TRANSFORM_IDENTITY);
  // Result:
  //   mat[0]  = 1; mat[1] = 0;
  //   mat[2]  = 0; mat[5] = 1;
       
  //   mat[4] = 0;
  //   mat[5] = 0;
};

SC.AffineTransformConcatTo = function(left, right, dest) {
  // Result:
  //   dest.m11 = left.m11 * right.m11 + left.m12 * right.m21;
  //   dest.m12 = left.m11 * right.m12 + left.m12 * right.m22;
  //   dest.m21 = left.m21 * right.m11 + left.m22 * right.m21;
  //   dest.m22 = left.m21 * right.m12 + left.m22 * right.m22;
  //   dest.tx = left.tx * right.m11 + left.ty * right.m21 + right.tx;
  //   dest.ty = left.tx * right.m12 + left.ty * right.m22 + right.ty;
  dest[0] = left[0] * right[0] + left[1] * right[2];
  dest[1] = left[0] * right[1] + left[1] * right[3];
  dest[2] = left[2] * right[0] + left[3] * right[2];
  dest[3] = left[2] * right[1] + left[3] * right[3];
  dest[4] = left[4] * right[0] + left[5] * right[2] + right[4];
  dest[5] = left[4] * right[1] + left[5] * right[3] + right[5];
};

SC.IsIdentityAffineTransform = function(mat) {
  if (mat[0]/*m11*/ === 1.0 &&
      mat[1]/*m12*/ === 0.0 &&
      mat[2]/*m21*/ === 0.0 &&
      mat[3]/*m22*/ === 1.0 &&
      mat[4]/*tx*/  === 0.0 &&
      mat[5]/*ty*/  === 0.0 ) return true;
  else return false;
};

// src and dest must be different!
SC.AffineTransformInvertTo = function(src, dest) {
  var determinant = 1 / (src[0]/*m11*/ * src[3]/*m22*/ - src[1]/*m12*/ * src[2]/*m21*/);

  sc_assert(src !== dest);

  dest[0]/*m11*/ =  determinant *  src[3]/*m22*/;
  dest[1]/*m12*/ = -determinant *  src[1]/*m12*/;
  dest[2]/*m21*/ = -determinant *  src[2]/*m21*/;
  dest[3]/*m22*/ =  determinant *  src[0]/*m11*/;
  dest[4]/*tx*/  =  determinant * (src[2]/*m21*/ * src[5]/*ty*/ - src[3]/*m22*/ * src[4]/*tx*/);
  dest[5]/*ty*/  =  determinant * (src[1]/*m12*/ * src[4]/*tx*/ - src[0]/*m11*/ * src[5]/*ty*/);
};

sc_assert(SC.IsIdentityAffineTransform(SC.AFFINE_TRANSFORM_IDENTITY));

SC.MakeTransform3D = function(mat, m12, m13, m14,
                              m21, m22, m23, m24,
                              m31, m32, m33, m34,
                              m41, m42, m43, m44)
{
  var ret, m11 = mat;

  if (arguments.length === 16) {
    ret = new Float32Array(16);  // initialize from function arguments
    ret[0]  = m11; ret[1]  = m12; ret[2]  = m13; ret[3]  = m14;
    ret[4]  = m21; ret[5]  = m22; ret[6]  = m23; ret[7]  = m24;
    ret[8]  = m31; ret[9]  = m32; ret[10] = m33; ret[11] = m34;
    ret[12] = m41; ret[13] = m42; ret[14] = m43; ret[15] = m44;

  } else if (mat) {
    sc_assert(mat.length === 16 && mat.constructor === Float32Array);
    ret = new Float32Array(mat); // initialize with existing transform3d

  } else {
    ret = new Float32Array(16);  // zero-initialized
  }

  return ret;
};

SC.MakeIdentityTransform3D = function() {
  var ret = new Float32Array(16);

  // A new Float32Array is already initialized to zero.
     ret[0]  = 1; /* ret[1]  = 0;    ret[2]  = 0;    ret[3]  = 0; */
  /* ret[4]  = 0; */ ret[5]  = 1; /* ret[6]  = 0;    ret[7]  = 0; */
  /* ret[8]  = 0;    ret[9]  = 0; */ ret[10] = 1; /* ret[11] = 0; */
  /* ret[12] = 0;    ret[13] = 0;    ret[14] = 0; */ ret[15] = 1;

  return ret;
};

SC.TRANSFORM3D_ZERO = SC.MakeTransform3D();
SC.TRANSFORM3D_IDENTITY = SC.MakeIdentityTransform3D();

// offset is in floats, not bytes
SC.MakeTransform3DFromBuffer = function(buffer, offset, mat, m12, m13, m14,
                                                        m21, m22, m23, m24,
                                                        m31, m32, m33, m34,
                                                        m41, m42, m43, m44)
                                                        
{
  var ret, m11 = mat;

  sc_assert_valid_float32_buffer(buffer, offset, 16);
  offset = offset*Float32Array.BYTES_PER_ELEMENT;

  if (arguments.length === 18) {
    ret = new Float32Array(buffer, offset); // initialize from function arguments
    ret[0]  = m11; ret[1]  = m12; ret[2]  = m13; ret[3]  = m14;
    ret[4]  = m21; ret[5]  = m22; ret[6]  = m23; ret[7]  = m24;
    ret[8]  = m31; ret[9]  = m32; ret[10] = m33; ret[11] = m34;
    ret[12] = m41; ret[13] = m42; ret[14] = m43; ret[15] = m44;

  } else if (mat) {
    sc_assert(mat.length === 16 && mat.constructor === Float32Array);
    ret = new Float32Array(buffer, offset);
    ret.set(mat);                           // initialize with existing transform3d

  } else {
    ret = new Float32Array(buffer, offset);
    ret.set(SC.TRANSFORM3D_ZERO);           // zero-initialize
  }

  return ret;
};

SC.MakeIdentityTransform3DFromBuffer = function(buffer, offset) {
  var ret = SC.MakeTransform3DFromBuffer(buffer, offset);
  ret.set(SC.TRANSFORM3D_IDENTITY);
  return ret;
};

SC.SetIdentityTransform3D = function(mat) {
  sc_assert(mat && mat.length === 16 && mat.constructor === Float32Array);
  mat.set(SC.TRANSFORM3D_IDENTITY);
  // Result:
  //   mat[0]  = 1; mat[1]  = 0; mat[2]  = 0; mat[3]  = 0;
  //   mat[4]  = 0; mat[5]  = 1; mat[6]  = 0; mat[7]  = 0;
  //   mat[8]  = 0; mat[9]  = 0; mat[10] = 1; mat[11] = 0;
  //   mat[12] = 0; mat[13] = 0; mat[14] = 0; mat[15] = 1;
};

// Below are ways to access these structures using names, rather than
// indices. They are designed to match the equivalent structure in Cocoa/
// Core Animation.
//
// Note that it is more efficient to index into them, so Blossom's own code 
// should always use the indices, not the getter/setters.

Float32Array.prototype.__defineGetter__('x', function() {
  return this[0];
});

Float32Array.prototype.__defineSetter__('x', function(val) {
  var old = this[0];
  this[0] = val;
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'x', old, val);
});

Float32Array.prototype.__defineGetter__('y', function() {
  return this[1];
});

Float32Array.prototype.__defineSetter__('y', function(val) {
  var old = this[1];
  this[1] = val;
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'y', old, val);
});

Float32Array.prototype.__defineGetter__('w', function() {
  return this.length === 2 ? this[0] : this[2];
});

Float32Array.prototype.__defineSetter__('w', function(val) {
  var old;
  if (this.length === 2) {
    old = this[0];
    this[0] = val;
  } else {
    old = this[2];
    this[2] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'w', old, val);
});

Float32Array.prototype.__defineGetter__('width', function() {
  return this.length === 2 ? this[0] : this[2];
});

Float32Array.prototype.__defineSetter__('width', function(val) {
  var old;
  if (this.length === 2) {
    old = this[0];
    this[0] = val;
  } else {
    old = this[2];
    this[2] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'width', old, val);
});

Float32Array.prototype.__defineGetter__('h', function() {
  return this.length === 2 ? this[1] : this[3];
});

Float32Array.prototype.__defineSetter__('h', function(val) {
  var old;
  if (this.length === 2) {
    old = this[1];
    this[1] = val;
  } else {
    old = this[3];
    this[3] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'h', old, val);
});

Float32Array.prototype.__defineGetter__('height', function() {
  return this.length === 2 ? this[1] : this[3];
});

Float32Array.prototype.__defineSetter__('height', function(val) {
  var old;
  if (this.length === 2) {
    old = this[1];
    this[1] = val;
  } else {
    old = this[3];
    this[3] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'height', old, val);
});

// Allow structure access to SC.AffineTransform and SC.Transform3D members.
'm11 m12 m13 m14 m21 m22 m23 m24 m31 m32 m33 m34 m41 m42 m43 m44'.w().forEach(function(prop, idx) {

  // The m21 and m22 props are defined below, but we leave them in here
  // so the indexing for subsquent properties is correct.
  if (prop === 'm21' || prop === 'm22') return;

  Float32Array.prototype.__defineGetter__(prop, function() {
    return this[idx];
  });

  Float32Array.prototype.__defineSetter__(prop, function(val) {
    var old = this[idx];
    this[idx] = val;
    var owner = this.owner;
    if (owner) owner.structureDidChange(this, this.keyName, prop, old, val);
  });

});

// The m21 and m22 members have different indices depending on array length.
Float32Array.prototype.__defineGetter__('m21', function() {
  return (this.length === 6) ? this[2] : this[4];
});

Float32Array.prototype.__defineSetter__('m21', function(val) {
  var old;
  if (this.length === 6) {
    old = this[2];
    this[2] = val;
  } else {
    old = this[4];
    this[4] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'm21', old, val);
});

Float32Array.prototype.__defineGetter__('m22', function() {
  return (this.length === 6) ? this[3] : this[5];
});

Float32Array.prototype.__defineSetter__('m22', function(val) {
  var old;
  if (this.length === 6) {
    old = this[3];
    this[3] = val;
  } else {
    old = this[5];
    this[5] = val;
  }
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'm22', old, val);
});

Float32Array.prototype.__defineGetter__('tx', function() {
  return this[4];
});

Float32Array.prototype.__defineSetter__('tx', function(val) {
  var old = this[4];
  this[4] = val;
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'tx', old, val);
});

Float32Array.prototype.__defineGetter__('ty', function() {
  return this[5];
});

Float32Array.prototype.__defineSetter__('ty', function(val) {
  var old = this[5];
  this[5] = val;
  var owner = this.owner;
  if (owner) owner.structureDidChange(this, this.keyName, 'ty', old, val);
});

} // BLOSSOM
