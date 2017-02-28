const $ = require('jquery');
const dt = require('datatables.net');
const moment = require('moment');
const numeral = require('numeral');
const sha1 = require('sha1');
const pako = require('pako');

const link = html => html.replace(/\b\w{38,40}\b/g,
  match => `<span data-id="${match}" class="sha1">~${match.slice(-8)}</span>`);

require('datatables.net-dt/css/jquery.dataTables.css');

$(() => {
  $.getJSON('info.json', data => {
    console.table(data.files);
    $('#myTable').DataTable({
      data: data.files,
      info: false,
      paging: false,
      order: [[3, 'desc'], [1, 'asc']],
      columns: [
        {
          data: 'id',
          title: 'ID',
          render: link
        },
        {
          data: 'type',
          title: 'Type',
          render: data => `<span class="object-${data}">${data}</span>`
        },
        {
          data: 'content',
          title: 'Content',
          render: (data) => {
            return `<pre>${link(data)}</pre>`
          }
        },
        {
          name: 'ctime',
          data: 'ctime',
          title: 'create',
          render: data => moment(data).format('HH:mm:ss.SSS')
        },
        {
          data: 'size',
          title: 'Size',
          render: data => numeral(data).format('0 b')
        },
        {
          data: 'contentSize',
          title: 'ContentSize',
          render: data => numeral(data).format('0 b')
        },
        {
          data: 'contentLength',
          title: 'contentLength'
        }
      ]
    });

    $('#log').html(link(data.log));
    $('#srcTree').html(link(data.srcTree));
    $('#gitTree').html(link(data.gitTree));
    $('#HEAD').html(link(data.HEAD));
    $('#branch').html(link(data.branch));
    $('#config').html(data.config);
    $('#version').html(data.version);

    $('#refs').dataTable({
      info: false,
      paging: false,
      data: data.refs,
      columns: [
        {
          data: 'path',
          title: 'Ref File'
        }, {
          data: 'content',
          title: 'Content',
          render: data => link(`<pre>${data}</pre>`)
        }
      ]
    })

    $('#packs').dataTable({
      info: false,
      paging: false,
      data: data.packs,
      columns: [
        {
          data: 'path',
          title: 'Pack index file'
        }, {
          data: 'content',
          title: 'Pack Content',
          render: data => link(`<pre>${data}</pre>`)
        }
      ]
    })
  });

  $('body').on('mouseover', '.sha1', function () {
    const highlightId = $(this).data('id').slice(-38);
    $('.sha1.active').removeClass('active');
    $(`.sha1[data-id$=${highlightId}]`).addClass('active');
  });
})


