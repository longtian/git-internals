const $ = require('jquery');
const dt = require('datatables.net');
const moment = require('moment');
const numeral = require('numeral');
const sha1 = require('sha1');
const pako = require('pako');

const link = html => html.replace(/\b\w{38,40}\b/g,
  match => `<span data-id="${match}" class="sha1">...${match.slice(-8)}</span>`);

require('datatables.net-dt/css/jquery.dataTables.css');

$(() => {
  $.getJSON('data.json', res => {
    console.table(res.files);
    $('#myTable').DataTable({
      data: res.files,
      info: false,
      paging: false,
      order: [[3, 'asc'], [1, 'desc']],
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
  });

  $('body').on('mouseover', '.sha1', function () {
    const highlightId = $(this).data('id').slice(-38);
    $('.sha1.active').removeClass('active');
    $(`.sha1[data-id$=${highlightId}]`).addClass('active');
  });


  $.getJSON('info.json', data => {
    $('#log').html(link(data.log));
    $('#srcTree').html(link(data.srcTree));
    $('#gitTree').html(link(data.gitTree));
    $('#HEAD').html(link(data.HEAD));
    $('#branch').html(link(data.branch));
    $('#config').html(data.config);
    $('#refs').html(link(JSON.stringify(data.refs, null, 2)));
  });

})


