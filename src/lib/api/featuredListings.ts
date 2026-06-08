/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getFeaturedListings() {
  return [
    {
      id: "prop-1",
      title: "The Glass Pavilion",
      price: 3850000,
      address: "1420 Ridgeview Terrace, Los Altos Hills, CA",
      beds: 5,
      baths: 6,
      sqft: 5200,
      image: "hero_luxury_home",
      type: "Estate",
      status: "Active",
      description: "A breathtaking architectural masterpiece designed by award-winning studio. This residence blends boundaries between natural outdoors and interior space with sleek 14-foot automated glass panel walls, cantilevered terraces, and refined walnut finishes.",
      features: ["Infinity Pool & Spa", "Automated Smart Glass Walls", "Teak Sunken Lounge", "750-Bottle Wine Gallery", "Private 1.2-Acre Oasis"]
    },
    {
      id: "prop-2",
      title: "Centennial Contemporary",
      price: 2450000,
      address: "988 Oakwood Lane, Los Altos, CA",
      beds: 4,
      baths: 4.5,
      sqft: 3800,
      image: "luxury_interior",
      type: "Single Family House",
      status: "Active",
      description: "Exquisite modernist living nestled in old-growth Oaks. Built in 2024, this home centers an expansive marble culinary island, high-pitch ceilings with skylights, automated soundscapes, and an impressive indoor-outdoor transition to a cedar redwood veranda.",
      features: ["Calacatta Marble Kitchen", "Cedar Redwood Veranda", "Integrated Sonos Audio", "Double Height Vaulted Ceilings", "Smart-Home Automation"]
    },
    {
      id: "prop-3",
      title: "Sausalito Bay Villa",
      price: 4950000,
      address: "44 Shoreline Path, Sausalito, CA",
      beds: 4,
      baths: 5,
      sqft: 4500,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      type: "Coastal Villa",
      status: "Active",
      description: "Immersive panoramas of the San Francisco Skyline and Angel Island. This custom-constructed coastal villa offers floating terraces on the water, a private deep-water yacht slip, limestone heated floors, and a private master wing with a custom cedar sauna.",
      features: ["Direct Yacht Slip Integration", "Panoramas of San Francisco Bay", "Limestone Heated Floors", "Private Finnish Teak Sauna", "Frameless Glass Railings"]
    }
  ];
}
