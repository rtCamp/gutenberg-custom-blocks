import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const attributes = {

	showCaseTitle: {
		type: 'array',
		field: {
			type: 'rich-text',
			className: 'showcase-title',
			placeholder: __( 'Showcase Title'),
			tagName: 'h3',
			inlineToolbar: false,
		},
		selector: '.showcase-title',
		source: 'children',
	},

	showCaseContent: {
		type: 'array',
		field: {
			type: 'rich-text',
			className: 'showcase-content',
			placeholder: __( 'Showcase description'),
			tagName: 'div',
			multiline: 'p',
			inlineToolbar: false,
		},
		selector: '.showcase-content',
		source: 'children',
	},

	showCaseImage: {
		type: 'object',
		field: {
			type: 'image',
			buttonText: __( 'Upload'),
			inputUrl: false,
			imagePlaceholder: true,
			removeButtonText: __( 'Remove'),
		},
	},

	showCaseLink: {
		type: 'string',
		field: {
			type: 'link',
			placement: 'inspector',
			label: __( 'Showcase link'),
		},
	},

};

const edit = (props, middleware) => {

	const {
		attributes: {
			showCaseLink,
		}
	} = props;

	const className = props.className ? props.className : '';

	return (
		<div className={className + ' showcase-wrapper alignwide'}>
			<div className="image-container">
				{middleware.fields.showCaseImage}
			</div>

			<div className="info-container">
				{middleware.inspectorControls}
				{middleware.fields.showCaseTitle}
				{middleware.fields.showCaseContent}
				{showCaseLink ? <a href={showCaseLink} title={__('Read More')} className="button secondary">{__('Read More')}</a> : ''}
			</div>
		</div>
	);

};

registerBlockType( 'rtgb/showcase', {

	title: __( 'Showcase' ),
	icon: 'portfolio',
	category: 'layout',
	description: __( 'Use for showcase' ),

	attributes,

	getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},

	edit,

	save( props ) {
		const {
			attributes: {
				showCaseImage,
				showCaseTitle,
				showCaseContent,
				showCaseLink,
			},
		} = props;

		const className = props.className ? props.className : '';
		let imageContent = '';

		if ( showCaseImage ) {
			const imageSrc = (
				<figure>
					<img src={ showCaseImage.url } alt={ showCaseImage.title } />
				</figure>
			);

			imageContent = (
				<div className="image-container">
					{ showCaseLink ? ( <a href={ showCaseLink } >{ imageSrc }</a> ) : imageSrc }
				</div>
			);
		}

		return (
			<div className={ className + ' showcase-wrapper alignwide' }>
				{ imageContent }
				<div className="info-container">
					{ showCaseLink ? ( <h3><a href={ showCaseLink } className="showcase-title" >{ showCaseTitle }</a></h3> ) : ( <h3 className="showcase-title">{ showCaseTitle }</h3> ) }
					<div className="showcase-content">{ showCaseContent }</div>
					{ showCaseLink ? <a href={ showCaseLink } title={ __( 'Read More' ) } className="button secondary">{ __( 'Read More' ) }</a> : '' }
				</div>
			</div>
		);
	},


	deprecated: [
		{
			attributes,
			edit,
			save(props) {
				const {
					attributes: {
						showCaseImage,
						showCaseTitle,
						showCaseContent,
						showCaseLink,
					},
				} = props;

				const className = props.className ? props.className : '';
				let imageContent = '';

				if (showCaseImage) {
					const imageSrc = (
						<figure>
							<img src={showCaseImage.url} alt={showCaseImage.title} />
						</figure>
					);

					imageContent = (
						<div className="image-container">
							{imageSrc}
						</div>
					);
				}

				return (
					<div className={className + ' showcase-wrapper alignwide'}>
						{imageContent}
						<div className="info-container">
							{showCaseLink ? (<h3><a href={showCaseLink} className="showcase-title" >{showCaseTitle}</a></h3>) : (<h3 className="showcase-title">{showCaseTitle}</h3>)}
							<div className="showcase-content">{showCaseContent}</div>
							{showCaseLink ? <a href={showCaseLink} title={__('Read More')} className="button secondary">{__('Read More')}</a> : ''}
						</div>
					</div>
				);
			},
		},
	],
} );
