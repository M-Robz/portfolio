import GraphicBanner from '../../react/GraphicBanner/GraphicBanner';
// import HtmlBanner from '../../react/HtmlBanner/HtmlBanner';
import Pencil from '../../react/Pencil/Pencil';

/*
 * Data for components such as banners, pencils, and headings whose content
 * depends on the currently active filter criteria.
 */
module.exports = function (imgPath) {

    // All categories are currently displaying this generic banner. The original
    // banners have been commented out
    const genericBanner = {
        Component: GraphicBanner,
        props: {
            srcDesktop: `${imgPath}classesevents-banner2.jpg`,
            srcMobile: `${imgPath}classesevents-banner2-m.jpg`,
            href: '/onlineclasses',
            outlined: true,
            readerMarkup: `
                <h1>Classes + Events Online</h1>
                <p>Join us for FREE classes on Zoom.</p>
                <p>Adults and teens (ages 13 and up) are invited to learn new skills from talented makers in Community Classroom Online, while kids ages 3 and up can try new projects in Kids Club&reg; Online.</p>
            `
        }
    };

    return {
        'Cosplay': {
            heading: 'Cosplay Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-cosplay-banner.jpg`,
                //         srcMobile: `${imgPath}classes-cosplay-banner-m.jpg`,
                //         href: '/onlineclasses?category=Cosplay',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Get ideas for bringing your fantasy world back to life.</h1>
                //             <p>Learn how to DIY your cosplay looks in our FREE online classes taught by cosplayers from your fave brands and makers like you.</p>
                //             <p>See upcoming cosplay classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Crafts & Hobbies': {
            heading: 'Crafts & Hobbies Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-crafthobbies-banner.jpg`,
                //         srcMobile: `${imgPath}classes-crafthobbies-banner-m.jpg`,
                //         href: '/onlineclasses?category=Crafts%20%26%20Hobbies',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>FREE online classes for the crafter in all of us</h1>
                //             <p>Experiment with new crafts and hobbies in these Zoom classes taught by talented makers.</p>
                //             <p>See upcoming craft classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Fine Art': {
            heading: 'Fine Art Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-fineart-banner.jpg`,
                //         srcMobile: `${imgPath}classes-fineart-banner-m.jpg`,
                //         href: '/onlineclasses?category=Fine%20Art',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>FREE online classes, made with artists in mind</h1>
                //             <p>Brush up on your skills or try something new! Join us on Zoom for classes taught by artists from your favorite brands and makers like you.</p>
                //             <p>See upcoming art classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Food Crafting': {
            heading: 'Food Crafting Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-foodcrafting-banner.jpg`,
                //         srcMobile: `${imgPath}classes-foodcrafting-banner-m.jpg`,
                //         href: '/onlineclasses?category=Food%20Crafting',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Bake it and make it in our FREE online classes.</h1>
                //             <p>Try your hand at a delicious DIY or learn to decorate like a pro! Join us on Zoom for classes taught by bakers from your fave brands and talented makers.</p>
                //             <p>See upcoming food crafting classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Home Décor': {
            heading: 'Home Décor Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-decor-banner.jpg`,
                //         srcMobile: `${imgPath}classes-decor-banner-m.jpg`,
                //         href: '/onlineclasses?category=Home%20D%C3%A9cor',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Share your love of decorating in our FREE online classes.</h1>
                //             <p>DIY d&eacute;cor that suits your style! Find your next project in one of our Zoom classes.</p>
                //             <p>See upcoming d&eacute;cor classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Jewelry': {
            heading: 'Jewelry Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-jewelry-banner.jpg`,
                //         srcMobile: `${imgPath}classes-jewelry-banner-m.jpg`,
                //         href: '/onlineclasses?category=Jewelry',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Craft one-of-a-kind jewelry in our FREE online classes.</h1>
                //             <p>From metal stamping and resin to beading and more, learn the latest in jewelry making from makers like you.</p>
                //             <p>See upcoming jewelry classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Kids': {
            heading: 'Kids Classes',
            elements: [
                genericBanner
                // {
                //     Component: HtmlBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-kids-banner2.jpg`,
                //         srcMobile: `${imgPath}classes-kids-banner2-m.jpg`,
                //         standardColor: 'blue',
                //         markup: `
                //             <h1 class="mel-category-banner__headline">Try our FREE online classes for mini makers!</h1>
                //             <p class="mel-category-banner__subhead">Discover fun and engaging projects the whole family can enjoy! Join us online for creative classes designed for kids ages 3 and up.</p>
                //             <p class="mel-category-banner__cta"><a href="/onlineclasses?category=Kids" class="mel-button mel-button--round">See Upcoming Kids' Classes</a></p>
                //         `,
                //     }
                // }
            ]
        },
        'Paper': {
            heading: 'Paper Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-papercraft-banner.jpg`,
                //         srcMobile: `${imgPath}classes-papercraft-banner-m.jpg`,
                //         href: '/onlineclasses?category=Paper',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Share your love for paper in our FREE online classes.</h1>
                //             <p>Get inspired and get creative with your paper crafting! Join us on Zoom for fun classes taught by craft influencers and paper crafters from your fave brands.</p>
                //             <p>See upcoming papercraft classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Seasonal': {
            heading: 'Seasonal Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-seasonal-banner.jpg`,
                //         srcMobile: `${imgPath}classes-seasonal-banner-m.jpg`,
                //         href: '/onlineclasses?category=Seasonal',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Get fresh ideas for the season in our FREE online classes.</h1>
                //             <p>Are you as excited to celebrate holidays and seasons as we are? Explore our Zoom classes to learn fresh seasonal DIYs all year long.</p>
                //             <p>See upcoming seasonal classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Small Business': {
            heading: 'Small Business Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-smallbusiness-banner.jpg`,
                //         srcMobile: `${imgPath}classes-smallbusiness-banner-m.jpg`,
                //         href: '/onlineclasses?category=Small%20Business',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>FREE online classes on turning passion into profit</h1>
                //             <p>From tips for starting your craft business to ideas for marketing your brand and more, learn from maker-preneurs who&rsquo;ve been through it!</p>
                //             <p>See upcoming small business classes</p>
                //         `
                //     }
                // }
            ]
        },
        'Technology': {
            heading: 'Technology Classes',
            elements: [
                genericBanner,
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-tech-banner.jpg`,
                //         srcMobile: `${imgPath}classes-tech-banner-m.jpg`,
                //         href: '/onlineclasses?category=Technology',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Learn how to make anything possible with tech-savvy crafting.</h1>
                //             <p>Take one of our FREE online classes taught by makers like you to learn the latest crafting technology from brands like Silhouette, Cricut&reg; and Siser&reg;.</p>
                //             <p>See upcoming tech classes</p>
                //         `
                //     }
                // },
                {
                    Component: Pencil,
                    props: {
                        srcDesktop: `${imgPath}premium-pencil.png`,
                        srcTablet: `${imgPath}premium-pencil-t.png`,
                        srcMobile: `${imgPath}premium-pencil-m.png`,
                        href: '/premiumonlineclasses',
                        alt: 'Classes + Events online. Develop cutting-edge crafting skills with us. Take your tech skills to the next level with our premium online classes. Sign up now',
                        outlined: false
                    }
                }
            ]
        },
        'Yarn': {
            heading: 'Yarn Classes',
            elements: [
                genericBanner
                // {
                //     Component: GraphicBanner,
                //     props: {
                //         srcDesktop: `${imgPath}classes-yarn-banner.jpg`,
                //         srcMobile: `${imgPath}classes-yarn-banner-m.jpg`,
                //         href: '/onlineclasses?category=Yarn',
                //         outlined: true,
                //         readerMarkup: `
                //             <h1>Get hooked on yarn crafts in our FREE online classes.</h1>
                //             <p>Try your hand at a new pattern (or two)! Explore our list of classes on Zoom and get inspired to start your next yarn project.</p>
                //             <p>See upcoming yarn classes</p>
                //         `
                //     }
                // }
            ]
        }
    };
};
