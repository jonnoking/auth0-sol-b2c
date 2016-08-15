/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.6
Version: 2.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.0/admin/material/
*/

var handleDataTableFixedColumns = function() {
	"use strict";
    
    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            scrollY:        300,
            scrollX:        true,
            scrollCollapse: true,
            paging:         false,
            fixedColumns:   true
        });
    }
};

var TableManageFixedColumns = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleDataTableFixedColumns();
        }
    };
}();