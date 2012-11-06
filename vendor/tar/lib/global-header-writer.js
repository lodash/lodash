module.exports = GlobalHeaderWriter

var ExtendedHeaderWriter = require("./extended-header-writer.js")
  , inherits = require("../vendor/inherits/inherits.js")

inherits(GlobalHeaderWriter, ExtendedHeaderWriter)

function GlobalHeaderWriter (props) {
  if (!(this instanceof GlobalHeaderWriter)) {
    return new GlobalHeaderWriter(props)
  }
  ExtendedHeaderWriter.call(this, props)
  this.props.type = "g"
}
