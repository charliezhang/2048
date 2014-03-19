
function Rand(seed) {
  this.m_w = seed;
  this.m_z = 987654321;
}

Rand.prototype.random = function() {
  this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & 0xffffffff;
  this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & 0xffffffff;
  return (((this.m_z << 16) + this.m_w) & 0xffffffff) / 4294967296 + 0.5;
}
