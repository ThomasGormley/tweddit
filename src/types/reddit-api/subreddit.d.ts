import { Listing } from "@/types/reddit-api/listing";

/**
 * Subreddit interface kind: `t5`
 */
export interface Subreddit {
    kind: "t5";
    data: SubredditData;
}

export interface SubredditData {
    user_flair_background_color: any;
    submit_text_html: any;
    restrict_posting: boolean;
    user_is_banned: any;
    free_form_reports: boolean;
    wiki_enabled: boolean;
    user_is_muted: any;
    user_can_flair_in_sr: any;
    display_name: string;
    header_img: any;
    title: string;
    allow_galleries: boolean;
    icon_size: any;
    primary_color: string;
    active_user_count: any;
    icon_img: string;
    display_name_prefixed: string;
    accounts_active: any;
    public_traffic: boolean;
    subscribers: number;
    user_flair_richtext: any[];
    videostream_links_count: number;
    name: string;
    quarantine: boolean;
    hide_ads: boolean;
    prediction_leaderboard_entry_type: string;
    emojis_enabled: boolean;
    advertiser_category: string;
    public_description: string;
    comment_score_hide_mins: number;
    allow_predictions: boolean;
    user_has_favorited: any;
    user_flair_template_id: any;
    community_icon: string;
    banner_background_image: string;
    original_content_tag_enabled: boolean;
    community_reviewed: boolean;
    submit_text: string;
    description_html: any;
    spoilers_enabled: boolean;
    comment_contribution_settings: CommentContributionSettings;
    allow_talks: boolean;
    header_size: any;
    user_flair_position: string;
    all_original_content: boolean;
    has_menu_widget: boolean;
    is_enrolled_in_new_modmail: any;
    key_color: string;
    can_assign_user_flair: boolean;
    created: number;
    wls: any;
    show_media_preview: boolean;
    submission_type: string;
    user_is_subscriber: any;
    allowed_media_in_comments: any[];
    allow_videogifs: boolean;
    should_archive_posts: boolean;
    user_flair_type: string;
    allow_polls: boolean;
    collapse_deleted_comments: boolean;
    emojis_custom_size: any;
    public_description_html: any;
    allow_videos: boolean;
    is_crosspostable_subreddit: boolean;
    suggested_comment_sort: any;
    should_show_media_in_comments_setting: boolean;
    can_assign_link_flair: boolean;
    accounts_active_is_fuzzed: boolean;
    allow_prediction_contributors: boolean;
    submit_text_label: string;
    link_flair_position: string;
    user_sr_flair_enabled: any;
    user_flair_enabled_in_sr: boolean;
    allow_chat_post_creation: boolean;
    allow_discovery: boolean;
    accept_followers: boolean;
    user_sr_theme_enabled: boolean;
    link_flair_enabled: boolean;
    disable_contributor_requests: boolean;
    subreddit_type: string;
    notification_level: any;
    banner_img: string;
    user_flair_text: any;
    banner_background_color: string;
    show_media: boolean;
    id: string;
    user_is_contributor: any;
    over18: boolean;
    header_title: string;
    description: string;
    is_chat_post_feature_enabled: boolean;
    submit_link_label: string;
    user_flair_text_color: any;
    restrict_commenting: boolean;
    user_flair_css_class: any;
    allow_images: boolean;
    lang: string;
    whitelist_status: any;
    url: string;
    created_utc: number;
    banner_size: any;
    mobile_banner_image: string;
    user_is_moderator: any;
    allow_predictions_tournament: boolean;
}

export interface CommentContributionSettings {}
