const Markup = [
    { r: /###### (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>######$1</span>" },
    { r: /##### (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>#####$1</span>" },
    { r: /#### (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>####$1</span>" },
    { r: /### (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>###$1</span>" },
    { r: /## (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>##$1</span>" },
    { r: /# (.*?)(\n|$)(?!<\/span>)/g, replace: "<span class='insertedSpan'>#$1</span>" },
    { r: /\*\*(.*?)\*\*(?!<\/span>)/g, replace: "<span class='insertedSpan'>**$1**</span>" },
    { r: /_(.*?)_(?!<\/span>)/g, replace: "<span class='insertedSpan'>_$1_</span>" },
    { r: /`(.*?)`(?!<\/span>)/g, replace: "<span class='insertedSpan'>`$1`</span>" },
]




function parseMarkdown(content = ""){

    Markup.forEach(regex => {
        content = content.replace(regex.r, regex.replace)
    })

    // .replace(/\n/g, "<br>")
    return content
}




export default parseMarkdown