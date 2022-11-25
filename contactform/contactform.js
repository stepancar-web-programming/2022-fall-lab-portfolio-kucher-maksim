jQuery(document).ready(($) => {
  $('form.contactForm').submit(function () {
    const f = $(this).find('.form-group');
    let ferror = false;
    const emailExp = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () {
      const i = $(this);
      let rule = i.attr('data-rule');

      if (rule !== undefined) {
        let ierror = false;
        const pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          const exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp, 10)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        // eslint-disable-next-line no-nested-ternary
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () {
      const i = $(this);
      let rule = i.attr('data-rule');

      if (rule !== undefined) {
        let ierror = false;
        const pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          const exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            // eslint-disable-next-line block-scoped-var
            if (i.val().length < parseInt(exp, 10)) {
              ferror = ierror = true;
            }
            break;
        }
        // eslint-disable-next-line no-nested-ternary
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (ferror) return false;
    const str = $(this).serialize();
    let action = $(this).attr('action');
    if (!action) {
      action = 'contactform/contactform.php';
    }
    $.ajax({
      type: 'POST',
      url: action,
      data: str,
      success(msg) {
        if (msg === 'OK') {
          $('#sendmessage').addClass('show');
          $('#errormessage').removeClass('show');
          $('.contactForm').find('input, textarea').val('');
        } else {
          $('#sendmessage').removeClass('show');
          $('#errormessage').addClass('show');
          $('#errormessage').html(msg);
        }
      },
    });
    return false;
  });
});
