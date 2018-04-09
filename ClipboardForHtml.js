const Clipboard = (function (window, document, navigator) {
  var textArea,
    copy,
    copyHtml

  function isOS () {
    return navigator.userAgent.match(/ipad|iphone/i)
  }

  function createTextArea (text) {
    textArea = document.createElement('textArea')
    textArea.value = text
    document.body.appendChild(textArea)
  }

  function createHtml (text) {
    textArea = document.createElement('span')
    textArea.innerHTML = text
    document.body.appendChild(textArea)
  }

  function selectTextHtlm () {
    if (document.selection) {
      var range = document.body.createTextRange()
      range.moveToElementText(textArea)
      range.select()
    } else if (window.getSelection) {
      var range = document.createRange()
      range.selectNode(textArea)
      window.getSelection().addRange(range)
    }
  }

  function selectText () {
    var range,
      selection

    if (isOS()) {
      range = document.createRange()
      range.selectNodeContents(textArea)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  function copyToClipboard () {
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  copy = function (text) {
    createTextArea(text)
    selectText()
    copyToClipboard()
  }
  copyHtml = function (text) {
    createHtml(text)
    selectTextHtlm()
    copyToClipboard()
  }

  return {
    copy: copy,
    copyHtml: copyHtml
  }
})(window, document, navigator)

export default Clipboard
