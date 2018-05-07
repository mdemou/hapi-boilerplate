'use strict';


function makeBookResponses({ responsesService }) {
  return {
    get_books_ok: responsesService.createInternalResponse(200, 'BOOKLST2000', 'Get book entries successfully!'),
    created_book_ok: responsesService.createInternalResponse(201, 'BOOKPOTATOED2010', 'Book created successfully!'),
    updated_book_ok: responsesService.createInternalResponse(200, 'BOOKUPDATED2001', 'Book updated successfully!'),
    deleted_book_ok: responsesService.createInternalResponse(200, 'BOOKDELETED20002', 'Book deleted successfully!'),
    not_found_book_404: responsesService.createInternalResponse(404, 'BOOKNOTFOUND4040', 'Resource not found'),
    found_book_ok: responsesService.createInternalResponse(200, 'BOOKFOUND2003', 'Book found successfully!')
  };
}

module.exports = makeBookResponses;
