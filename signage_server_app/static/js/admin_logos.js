var logo = {};
var displays = [];

var acceptedFiles = ["image/png", "image/jpeg", "image/gif", "image/webp", "video/mp4", "video/webm", "video/quicktime"];
var _URL = window.URL || window.webkitURL;
var maxDimension = 3840; // 4K

var editlogoId = null;
var publishlogoId = null;
var publishDisplayItem = null;
var areYouSureItemId = null;

// Used in Typeahead string matching
var substringMatcher = function(objs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(objs, function(i, obj) {
      if (substrRegex.test(obj['name'])) {
        matches.push(obj);
      }
    });

    cb(matches);
  };
};

// Code for managing the alert message at the top of the page
function setAlertMessage(message, alertType, autoHide=true) {
  $('#alertBox').removeClass("alert-warning-custom");
  $('#alertBox').removeClass("alert-success-custom");
  $('#alertBox').removeClass("alert-danger-custom");
  $('#alertBox').empty();
  switch (alertType) {
    case "warning":
      $('#alertBox').addClass("alert-warning-custom");
      $('#alertBox').append(message);
      break;
    case "success":
      $('#alertBox').addClass("alert-success-custom");
      $('#alertBox').append(message);
      break;
    case "error":
      $('#alertBox').addClass("alert-danger-custom");
      $('#alertBox').append(message);
      break;
  }
  $('#alertBox').slideDown("fast");
  if (autoHide) {
    setTimeout(function(){$('#alertBox').slideUp("slow")}, 5000);
  }
}

// Formats the buttons for each row in the table
function formatButtons(dataId) {
  var html = '<div class="btn-group">';
  // Edit
  html += '<span data-toggle="modal" data-target="#logoModal" data-id="' + dataId + '">';
  html += '<button type="button" class="btn btn-light" data-type="editlogo" data-id="' + dataId + '" data-toggle="tooltip" data-placement="top" title="Edit logo">';
  html += '<img src="/static/icons/edit.svg" alt="Edit" class="row-icon"></button></span>';
  // View
  html += '<button type="button" class="btn btn-light" data-type="previewlogo" data-id="' + dataId + '" data-toggle="tooltip" data-placement="top" title="Preview logo">';
  html += '<img src="/static/icons/eye.svg" alt="View" class="row-icon"></button>';
  // Publish
  html += '<span data-toggle="modal" data-target="#logoPublishModal" data-id="' + dataId + '">';
  html += '<button type="button" class="btn btn-light" data-type="publishlogo" data-id="' + dataId + '" data-toggle="tooltip" data-placement="top" title="Publish logo">';
  html += '<img src="/static/icons/publish.svg" alt="Publish" class="row-icon"></button></span>';
  // Delete
  html += '<span data-toggle="modal" data-target="#areYouSureModal" data-id="' + dataId + '">';
  html += '<button type="button" class="btn btn-light" data-type="deletelogo" data-id="' + dataId + '" data-toggle="tooltip" data-placement="top" title="Delete logo">';
  html += '<img src="/static/icons/delete.svg" alt="Delete" class="row-icon"></button></span>';
  //
  html += '</div>';
  return html;
}

// Called on page load to get the table data and initialize Datatable
function getTable(refresh) {
  $.getJSON("/api/logos", function(response) {
    $.each(response.items, function(i, item) {
      logo[String(item.id)] = item;
    });
    if (refresh) {
      $('#logoTable').DataTable().destroy();
    }
    var table = $("#logoTable").DataTable({
      data: response.items,
      rowId: "id",
      buttons: [
        {
          text: "+ Add logo",
          className: "btn-primary-custom",
          action: function ( e, dt, node, config ) {
            $('#logoModal').modal("show");
            editlogoId = null; // make sure this is null for a new logo
          }
        }
      ],
      columns: [
        {
          title: "ID",
          data: "id",
          visible: true
        },
        {
          title: "Preview",
          data: "thumb",
          orderable: false,
          responsivePriority: 3,
          render: function(data) {
            return '<img src="' + data + '" alt="Thumbnail" class="thumbnail" data-type="previewlogo">';
          },
          createdCell: function (td, cellData, rowData, row, col) {
            $(td).css('text-align', 'center');
          }
        },
        {
          title: "Name",
          data: "name",
          responsivePriority: 1
        },
        {
          title: "Type",
          data: "type",
          responsivePriority: 4,
          render: function(data) {
            return data.charAt(0).toUpperCase() + data.slice(1);
          }
        },
        {
          title: "Resolution",
          data: "resolution",
          responsivePriority: 5
        },
        {
          title: "Options",
          data: "id",
          width: "170px",
          responsivePriority: 2,
          orderable: false,
          render: function(data) {
            return formatButtons(data);
          },
          createdCell: function(td, cellData, rowData, row, col) {
            $(td).attr("nowrap","nowrap");
            $(td).attr("style","text-align: right;");
          }
        }
      ],
      scrollY: "50vh",
      scrollCollapse: true,
      paging: false,
      responsive: {
        details: false
      }
    });
    table.buttons().container().prependTo( $('#logoTable_wrapper').find("div").first().find("div").first() );
    table.buttons().container().find("button").removeClass("btn-secondary");
  });
}

// Get the displays to use in the Typeahead during publish
function getDisplays() {
  $.getJSON("/api/displays", function(data) {
    displays = data.items;
  });
}

// Initialize Typehead using display data
function initTypeahead() {
  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 0
  },
  {
    name: 'displays',
    display: 'name',
    source: substringMatcher(displays),
    templates: {
      suggestion: function(obj) {
        if (obj['active']) {
          return '<div><strong>' + obj['name'] + '</strong> – Active</div>';
        } else {
          return '<div><strong>' + obj['name'] + '</strong> – Not Active</div>';
        }
      }
    }
  });
}

// Page Load
$(document).ready(function() {
  var page = window.location.pathname.split("/").slice(-1)[0];
  $('.nav-link[data-page="' + page + '"]').addClass('active');
  getTable(false);
  getDisplays();
});


// Add New logo or Edit Existing

function clearlogoModal() {
  editlogoId = null;
  $('#logoName').val("");
  $('#logoUpload').val("");
  $('#logoUploadText').text("");
}

$('#logoTable').on('click', '[data-type="editlogo"]', function(e) {
  editlogoId = $(this).data('id');
  $('#logoName').val(logo[editlogoId]['name']);
  $('#logoModalSave').attr("disabled", false);
});

$('#logoModal').on('shown.bs.modal', function() {
  $('#logoName').focus();
});

$('#logoName').on('input', function() {
  if ($('#logoName').val().length > 0) {
    $('#logoModalSave').attr("disabled", false);
  } else {
    $('#logoModalSave').attr("disabled", true);
  }
});

$('#logoUpload').on('change', function() {
  var file, img;
  if ((file = this.files[0])) {
    console.log("File Type: " + file.type);
    if (!acceptedFiles.includes(file.type)) {
      // Invalid file type
      $('#logoUploadText').text("Invalid file type. Acceptable types:\nJPEG, PNG, GIF, WEBP, MP4, MOV, WEBM");
      $('#logoModalSave').attr("disabled", true);
    } else {
      $('#logoUploadText').text("");
      if (file.type.split('/')[0] == "image") {
        // Check to make sure image is not too large
        img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function () {
          console.log("File Dimensions: " + img.width + "x" + img.height);
          if (this.width > maxDimension || this.height > maxDimension) {
            // logo dimensions too big
            $('#logoUploadText').text("Image resolution can't be more than 3840x2160 (actual: " + this.width + "x" + this.height + ")");
            $('#logoModalSave').attr("disabled", true);
          } else {
            // Everything is good
            $('#logoUploadText').text("");
            $('#logoModalSave').attr("disabled", false);
          }
        };
      } else {
        // Don't have a way of checking resolution of videos in Javascript
        $('#logoUploadText').text("");
        $('#logoModalSave').attr("disabled", false);
      }
    }
  }
});

$('#logoModalSave').on('click', function(e) {
  if ($('#logoUpload')[0].files[0]) {
    // File is present
    var content_type = false;
    var logo_object = new FormData();
    logo_object.append("file", $('#logoUpload')[0].files[0]);
    logo_object.append("name", $('#logoName').val());
  } else {
    // File is not present
    var content_type = "application/json";
    var temp_object = logo[editlogoId];
    temp_object['name'] = $('#logoName').val();
    var logo_object = JSON.stringify(temp_object);
  }
  if (editlogoId == null) {
    // POST new logo
    $.ajax({
      type: "POST",
      url: "/api/logos",
      contentType: content_type,
      processData: false,
      data: logo_object,
      success: function(result) {
        if (result.status == "SUCCESS") {
          setAlertMessage("<strong>Success!</strong> '" + $('#logoName').val() + "' has been added.", "success");
        } else {
          setAlertMessage("<strong>Error!</strong> Failed to add new logo.", "error");
        }
        clearlogoModal();
        getTable(true);
      }
    });
    // Large uploads can take a few seconds across a network, so set this warning message
    setAlertMessage("<strong>Upload in Progress!</strong> Please don't leave this window until upload complete.", "warning", false);
  } else {
    // PUT updated logo
    $.ajax({
      type: "PUT",
      url: "/api/logos/" + editlogoId,
      contentType: content_type,
      processData: false,
      data: logo_object,
      success: function(result) {
        if (result.status == "SUCCESS") {
          setAlertMessage("<strong>Success!</strong> '" + $('#logoName').val() + "' has been updated.", "success");
        } else {
          setAlertMessage("<strong>Error!</strong> Failed to update logo.", "error");
        }
        clearlogoModal();
        getTable(true);
      }
    });
    // Large uploads can take a few seconds across a network, so set this warning message
    setAlertMessage("<strong>Upload in Progress!</strong> Please don't leave this window until upload complete.", "warning", false);
  }
});


// Preview logo

$('#logoTable').on('click', '[data-type="previewlogo"]', function(e) {
  var itemId = $(this).data('id');
  var win = window.open('/logos/' + itemId, '_blank');
  if (win) {
      //Browser has allowed it to be opened
      win.focus();
  } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
  }
});


// Publish logo

function clearPublishlogoModal() {
  publishlogoId = null;
  publishDisplayItem = null;
  $("#logoPublishDisplayName").val('');
  $('.typeahead').typeahead("destroy");
  $('#logoPublishModalSave').attr("disabled", true);
}

$('#logoTable').on('click', '[data-type="publishlogo"]', function(e) {
  publishlogoId = $(this).data('id');
  initTypeahead();
});

$('#logoPublishModal').on('shown.bs.modal', function() {
  $('#logoPublishDisplayName').focus();
});

$('#logoPublishModalClose').on('click', function(e) {
  clearPublishlogoModal();
});

$('#logoPublishModalX').on('click', function(e) {
  clearPublishlogoModal();
});

$('.typeahead').on('typeahead:selected', function(evt, item) {
  $('#logoPublishModalSave').attr("disabled", false);
  publishDisplayItem = item;
});

$('#logoPublishModalSave').on('click', function(e) {
  var now = new Date();
  publishDisplayItem['logo'] = logo[publishlogoId];
  publishDisplayItem['updated'] = now.toISOString();
  $.ajax({
    type: "PUT",
    url: "/api/displays/" + publishDisplayItem['id'],
    contentType: "application/json",
    data: JSON.stringify(publishDisplayItem),
    success: function(result) {
      if (result.status == "SUCCESS") {
        setAlertMessage("<strong>Success!</strong> Now displaying '" + logo[publishlogoId]['name'] + "' on display '" + publishDisplayItem['name'] + "'", "success");
      } else {
        setAlertMessage("<strong>Error!</strong> Could not update logo on display.", "error");
      }
      clearPublishlogoModal();
    }
  });
});


// Delete logo

function clearAreYouSureModal() {
  $("#areYouSureMessage").text("");
  $("#areYouSureModalConfirm").text("");
  areYouSureItemId = null;
}

$('#logoTable').on('click', '[data-type="deletelogo"]', function(e) {
  $("#areYouSureMessage").text("Do you want to delete this logo? This cannot be undone.");
  $("#areYouSureModalConfirm").text("Delete");
  areYouSureItemId = $(this).data('id');
});

$('#areYouSureModalClose').on('click', function(e) {
  clearAreYouSureModal();
});

$('#areYouSureModalX').on('click', function(e) {
  clearAreYouSureModal();
});

$('#areYouSureModalConfirm').on('click', function(e) {
  console.log("Item ID: " + areYouSureItemId);
  $.ajax({
    type: "DELETE",
    url: "/api/logos/" + areYouSureItemId,
    success: function(result) {
      console.log("Success");
      var table = $('#logoTable').DataTable();
      table.row("#" + areYouSureItemId).remove().draw();
      setAlertMessage("<strong>Success!</strong> logo has been deleted.", "success");
      clearAreYouSureModal();
    },
    error: function(result) {
      console.log("Failed!");
      console.log(result);
      setAlertMessage("<strong>Error!</strong> Could not delete logo.", "error");
    }
  });
});