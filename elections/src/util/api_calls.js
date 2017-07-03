import $ from 'jquery';

export const getAllCandidateInfo = () => (
  $.ajax({
      type: "GET",
      url: "http://localhost:9000/read"
  })
)
