function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const renderData = (item) => {
  const date = new Date(item.createdAt).toLocaleDateString();
  const html = `<a href="" class="text-dark">
  <div class="row mb-4 border-bottom pb-3">
    <div class="col-3">
      <img
        src=${item.image}
        class="img-fluid shadow-strong rounded"
        alt=${item.title}
      />
    </div>
    <div class="col-9">
      <p class="mb-2">
        <strong>${item.title}</strong>
      </p>
      <p>
        <u>${date}</u>
      </p>
    </div>
  </div>
</a>`;
  return html;
};

let page = 1;
let isComplete = false;
let endPoint = false;
const skeleton = $("#skeleton");

const getBlog = async () => {
  isComplete = false;
  skeleton.show();
  await sleep(1000);
  try {
    const response = await axios.get(
      "https://5f55a98f39221c00167fb11a.mockapi.io/blogs",
      {
        params: {
          limit: 5,
          page,
        },
      }
    );
    if (!response.data.length) {
      skeleton.fadeOut();
      return (endPoint = true);
    }
    $("#news").append(response.data.map(renderData));
    isComplete = true;
    skeleton.fadeOut();
  } catch (err) {
    isComplete = false;
  }
};

getBlog();

$(window).on("scroll", function () {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight && isComplete && !endPoint) {
    ++page;
    getBlog();
  }
});
