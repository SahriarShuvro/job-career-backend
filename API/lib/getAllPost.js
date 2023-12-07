const getAllJobs = async (model, page, limit, decodeData) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model
      .find()
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(startIndex)
      .exec();
    // Count total number of items in the collection
    const totalItems = await model.countDocuments();
    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / limit);

    // Count total number of active items
    const totalActiveItems = await model.countDocuments({
      active_status: true,
    });

    // Count total number of inactive items
    const totalInactiveItems = totalItems - totalActiveItems;

    let allPost = results.results.map(decodeData);

    return {
      totalItems,
      totalPages,
      page,
      totalActiveItems,
      totalInactiveItems,
      allPost,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAllJobs;
