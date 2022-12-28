jQuery(document).ready($ => {
  $('form.contactForm').submit(function () {
    const f = $(this).find('.form-group')
    let fError = false
    const emailExp = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i

    f.children('input').each(function () {
      const i = $(this)
      let contactRule = i.attr('data-rule')

      if (contactRule !== undefined) {
        let iError = false
        const pos = contactRule.indexOf(':', 0)
        if (pos >= 0) {
          const exp = contactRule.substr(pos + 1, contactRule.length)
          contactRule = contactRule.substr(0, pos)
        } else {
          contactRule = contactRule.substr(pos + 1, contactRule.length)
        }

        switch (contactRule) {
          case 'required':
            if (i.val() === '') {
              fError = iError = true
            }
            break

          case 'minlen':
            if (i.val().length < parseInt(exp, 10)) {
              fError = iError = true
            }
            break

          case 'email':
            if (!emailExp.test(i.val())) {
              fError = iError = true
            }
            break

          case 'checked':
            if (!i.is(':checked')) {
              fError = iError = true
            }
            break

          case 'regexp':
            exp = new RegExp(exp)
            if (!exp.test(i.val())) {
              fError = iError = true
            }
            break
        }
        // eslint-disable-next-line no-nested-ternary
        i.next('.validation')
          .html(
            iError
              ? i.attr('data-msg') !== undefined
                ? i.attr('data-msg')
                : 'wrong Input'
              : ''
          )
          .show('blind')
      }
    })
    f.children('textarea').each(function () {
      const i = $(this)
      let contactRule = i.attr('data-rule')

      if (contactRule !== undefined) {
        let iError = false
        const pos = contactRule.indexOf(':', 0)
        if (pos >= 0) {
          const exp = contactRule.substr(pos + 1, contactRule.length)
          contactRule = contactRule.substr(0, pos)
        } else {
          contactRule = contactRule.substr(pos + 1, contactRule.length)
        }

        switch (contactRule) {
          case 'required':
            if (i.val() === '') {
              fError = iError = true
            }
            break

          case 'minlen':
            // eslint-disable-next-line block-scoped-var
            if (i.val().length < parseInt(exp, 10)) {
              fError = iError = true
            }
            break
        }
        // eslint-disable-next-line no-nested-ternary
        i.next('.validation')
          .html(
            iError
              ? i.attr('data-msg') !== undefined
                ? i.attr('data-msg')
                : 'wrong Input'
              : ''
          )
          .show('blind')
      }
    })

    if (fError) {
      return false
    }
    const str = $(this).serialize()
    let contactAction = $(this).attr('action')
    if (!contactAction) {
      contactAction = 'contactform/contactform.php'
    }
    $.ajax({
      type: 'POST',
      url: contactAction,
      data: str,
      success (msg) {
        if (msg === 'OK') {
          $('#sendmessage').addClass('show')
          $('#errormessage').removeClass('show')
          $('.contactForm').find('input, textarea').val('')
        } else {
          $('#sendmessage').removeClass('show')
          $('#errormessage').addClass('show')
          $('#errormessage').html(msg)
        }
      }
    })
    return false
  })
})
